import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getAllRepositories } from '../../configuration';
import { loadGlobalVariables, startupTasks, removeTagFromRepositories } from '../tasks';

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
