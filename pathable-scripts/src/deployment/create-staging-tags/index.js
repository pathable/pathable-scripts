import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { loadGlobalVariables, startupTasks, tagRepositories } from '../tasks';
import { getAllRepositories } from '../../configuration';

const globalVariablesLoaded = loadGlobalVariables();

if (globalVariablesLoaded) {
  startupTasks('staging').then(() => {
    prompt.start();
    prompt.get(inputSchema, (err, inputs) => {
      const repositories = getAllRepositories();
      return tagRepositories(repositories, inputs.tagName)
        .then(() => {
          console.log(chalk.green('Finished creating staging tags.'));
        })
        .catch((error) => {
          if (error) console.log(chalk.red(error));
        });
    });
  });
}
