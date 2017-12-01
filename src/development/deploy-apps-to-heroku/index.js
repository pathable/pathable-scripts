import path from 'path';
import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getRepositoriesByName } from '../../configuration';
import {
  loadGlobalVariables,
  buildDeployBundle,
  generateProcfiles,
  generateRootPackageJson,
  generateSettingsJson,
  deployToHeroku,
} from '../tasks';
import {
  createDeployDirectoryForHeroku,
  createLogsDirectory,
  getAppsToBuild,
} from '../../utilities/misc';

const globalVariablesLoaded = loadGlobalVariables(true);
if (globalVariablesLoaded) {
  const appRoot = path.resolve(path.join(__dirname, '../../../'));
  const deploymentRoot = createDeployDirectoryForHeroku(appRoot);
  const logsRoot = createLogsDirectory(appRoot);

  process.env.APP_ROOT = appRoot;
  process.env.DEPLOYMENT_ROOT = deploymentRoot;
  process.env.LOGS_ROOT = logsRoot;

  prompt.start();
  prompt.get(inputSchema, (err, inputs) => {
    const appNames = getAppsToBuild(inputs);
    const appRepositories = getRepositoriesByName(appNames);
    buildDeployBundle(appRepositories)
      .then(() => {
        generateProcfiles(appRepositories);
        generateRootPackageJson(appRepositories);
        generateSettingsJson(appRepositories, inputs.featurePrefix);
        deployToHeroku(appRepositories, inputs.featurePrefix);
      })
      .then(() => {
        console.log(chalk.green('Finished deploying apps.'));
      })
      .catch((error) => {
        if (error) console.log(chalk.red(error));
      });
  });
}
