import path from 'path';
import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getAllRepositories } from '../../configuration';
import { loadGlobalVariables, getCurrentBranchs } from '../tasks';
import { createLogsDirectory } from '../../utilities/misc';

const globalVariablesLoaded = loadGlobalVariables();
if (globalVariablesLoaded) {
  const appRoot = path.resolve(path.join(__dirname, '../../../'));
  const logsRoot = createLogsDirectory(appRoot);
  process.env.LOGS_ROOT = logsRoot;

  const repositories = getAllRepositories();
  getCurrentBranchs(repositories);

  prompt.start();
  prompt.get(inputSchema, (err, inputs) => {
    /*
    return runCustomCommand(repositories, inputs.commandString)
      .then(() => {
        console.log(chalk.green('Finished switching branches.'));
      })
      .catch((error) => {
        if (error) console.log(chalk.red(error));
      });
      */
  });
}
