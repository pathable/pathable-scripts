import path from 'path';
import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getAppRepositories } from '../../configuration';
import {
  loadGlobalVariables,
  buildDeployBundle,
  generateProcfiles,
  generateRootPackageJson,
  generateSettingsJson,
  deployToHeroku,
} from '../tasks';
import { createDeployDirectoryForHeroku, createLogsDirectory } from '../../utilities/misc';

const globalVariablesLoaded = loadGlobalVariables(true);
if (globalVariablesLoaded) {
  const appRoot = path.resolve(path.join(__dirname, '../../../'));
  const deploymentRoot = createDeployDirectoryForHeroku(appRoot);
  const logsRoot = createLogsDirectory(appRoot);

  process.env.APP_ROOT = appRoot;
  process.env.DEPLOYMENT_ROOT = deploymentRoot;
  process.env.LOGS_ROOT = logsRoot;

  const appRepositories = getAppRepositories();

  prompt.start();
  prompt.get(inputSchema, (err, inputs) => {
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
