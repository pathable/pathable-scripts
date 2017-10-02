import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getAllRepositories } from '../../configuration';
import { startupTasks, removeTagFromRepositories } from '../tasks';
import { loadGlobalVariables } from '../../utilities/misc';

console.log(chalk.yellow('Getting github credentials from environment file...'));
const globalVariablesLoaded = loadGlobalVariables();

if (globalVariablesLoaded) {
  startupTasks('staging').then(() => {
    prompt.start();
    prompt.get(inputSchema, (err, inputs) => {
      const repositories = getAllRepositories();
      const tagName = inputs.tagName;

      removeTagFromRepositories(repositories, tagName)
        .then(() => {
          console.log(chalk.green('Finished removing tags.'));
        })
        .catch((error) => {
          if (error) console.log(chalk.red(error));
        });
    });
  });
}
