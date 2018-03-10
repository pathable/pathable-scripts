import path from 'path';
import chalk from 'chalk';

import {
  loadGlobalVariables,
  buildDeployBundle,
  generateProcfiles,
  generateRootPackageJson,
  deployToHeroku,
} from '../tasks';
import { createDeployDirectoryForHeroku, createLogsDirectory } from '../../utilities/misc';

import generateSettingsJson from './generate-settings-json';

const designAppRepository = {
  name: 'pathable-design',
  localPath: 'pathable-design',
};

const globalVariablesLoaded = loadGlobalVariables(true);
if (globalVariablesLoaded) {
  const appRoot = path.resolve(path.join(__dirname, '../../../'));
  const deploymentRoot = createDeployDirectoryForHeroku(appRoot);
  const logsRoot = createLogsDirectory(appRoot);

  process.env.APP_ROOT = appRoot;
  process.env.DEPLOYMENT_ROOT = deploymentRoot;
  process.env.LOGS_ROOT = logsRoot;

  buildDeployBundle([designAppRepository])
    .then(() => {
      generateProcfiles([designAppRepository]);
      generateRootPackageJson([designAppRepository]);
      generateSettingsJson(designAppRepository);
      deployToHeroku([designAppRepository], '');
    })
    .then(() => {
      console.log(chalk.green('Finished deploying apps.'));
    })
    .catch((error) => {
      if (error) console.log(chalk.red(error));
    });
}
