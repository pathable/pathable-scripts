import fs from 'fs';
import path from 'path';
import prompt from 'prompt';
import chalk from 'chalk';
import dotenv from 'dotenv';

import inputSchema from './input-schema';
import {
  cloneRepositories,
  checkoutSources,
  pullLatestChanges,
  updatePackageJsons,
  loadEnvVariables,
  installNpmDependencies,
  runUnitTests,
  deployToServer,
  tagRepositories,
} from './tasks';
import { getRepositoriesByName } from '../configuration';
import { loggedInToMeteor } from '../utilities/meteor';
import {
  createDeployDirectory,
  createLogsDirectory,
  getAppsToBuild,
  getDependencies,
  getTagMessage,
} from '../utilities/misc';

console.log(chalk.yellow('Checking meteor logged in status...'));
const loggedIn = loggedInToMeteor();
if (!loggedIn) {
  console.log('You need to be logged-in into meteor to continue.');
} else {
  prompt.start();

  prompt.get(inputSchema, (err, inputs) => {
    const appRoot = path.resolve(path.join(__dirname, '../../'));
    const deploymentRoot = createDeployDirectory(appRoot);
    const logsRoot = createLogsDirectory(appRoot);

    const globalEnvFile = path.resolve(path.join(process.env.HOME, '.pathable-env'));
    if (fs.existsSync(globalEnvFile)) {
      const globalEnv = dotenv.parse(fs.readFileSync(globalEnvFile));
      process.env.GITHUB_USERNAME = globalEnv.GITHUB_USERNAME;
      process.env.GITHUB_TOKEN = globalEnv.GITHUB_TOKEN;
    }

    process.env.TOOL_NODE_FLAGS = '--max-old-space-size=4096';
    process.env.METEOR_PACKAGE_DIRS = deploymentRoot;
    process.env.DEPLOYMENT_ROOT = deploymentRoot;
    process.env.LOGS_ROOT = logsRoot;
    process.env.DEPLOYMENT_TARGET = inputs.deploymentTarget;

    let repositories;
    let appRepositories;
    cloneRepositories()
      .then(() => {
        const apps = getAppsToBuild(inputs);
        const packages = getDependencies(apps);
        const repositoryNames = apps.concat(packages);
        appRepositories = getRepositoriesByName(apps);
        repositories = getRepositoriesByName(repositoryNames);

        process.env.TAG_NAME = inputs.tagName;
        process.env.TAG_MESSAGE = getTagMessage(repositories);

        return checkoutSources(repositories);
      })
      .then(() => pullLatestChanges(repositories))
      .then(() => updatePackageJsons(repositories))
      .then(() => loadEnvVariables(repositories))
      .then(() => installNpmDependencies(repositories))
      .then(() => runUnitTests(inputs, repositories))
      .then(() => deployToServer(appRepositories))
      // .then(() => tagRepositories(repositories, inputs.tagName))
      .then(() => {
        console.log(chalk.green('Finished deployment.'));
      })
      .catch((error) => {
        if (error) console.log(chalk.red(error));
      });
  });
}
