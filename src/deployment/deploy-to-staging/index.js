import path from 'path';
import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import {
  cloneRepositories,
  checkoutSources,
  getTagsList,
  checkoutTag,
  updatePackageJsons,
  loadEnvironmentVariables,
  installNpmDependencies,
  runUnitTests,
  deployToServer,
} from '../tasks';

import { getAllRepositories, getAppRepositories, getRepositoriesByName } from '../../configuration';
import { loggedInToMeteor } from '../../utilities/meteor';
import {
  createDeployDirectory,
  createLogsDirectory,
  getAppsToBuild,
  getDependencies,
  loadGlobalVariables,
} from '../../utilities/misc';

let loggedIn;

console.log(chalk.yellow('Getting github credentials from environment file...'));
const globalVariablesLoaded = loadGlobalVariables();
if (globalVariablesLoaded) {
  console.log(chalk.yellow('Checking meteor logged in status...'));
  loggedIn = loggedInToMeteor();
}

if (globalVariablesLoaded && loggedIn) {
  const allRepositories = getAllRepositories();
  const allAppRepositories = getAppRepositories();
  const appRoot = path.resolve(path.join(__dirname, '../../../'));
  const deploymentRoot = createDeployDirectory(appRoot);
  const logsRoot = createLogsDirectory(appRoot);

  // These environment variables are used by the meteor build utility
  process.env.TOOL_NODE_FLAGS = '--max-old-space-size=4096';
  process.env.METEOR_PACKAGE_DIRS = deploymentRoot;
  // These environment variables are for internal use of this utility
  process.env.DEPLOYMENT_ROOT = deploymentRoot;
  process.env.LOGS_ROOT = logsRoot;
  process.env.DEPLOYMENT_TARGET = 'staging';

  let repositories;
  let appRepositories;

  cloneRepositories()
    .then(() => checkoutSources(allRepositories))
    .then(() => {
      getTagsList(allAppRepositories);

      prompt.start();
      prompt
        .get(inputSchema, (err, inputs) => {
          const appNames = getAppsToBuild(inputs);
          const packageNames = getDependencies(appNames);
          const repositoryNames = appNames.concat(packageNames);
          appRepositories = getRepositoriesByName(appNames);
          repositories = getRepositoriesByName(repositoryNames);

          return updatePackageJsons(repositories, inputs.tagName)
            .then(() => checkoutTag(repositories))
            .then(() => loadEnvironmentVariables(repositories))
            .then(() => installNpmDependencies(repositories))
            .then(() => runUnitTests(inputs, repositories))
            .then(() => deployToServer(appRepositories));
        })
        .then(() => {
          console.log(chalk.green('Finished deployment.'));
        })
        .catch((error) => {
          if (error) console.log(chalk.red(error));
        });
    });
}
