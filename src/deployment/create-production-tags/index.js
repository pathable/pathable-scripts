import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { tagRepositories } from '../tasks';
import { getAllRepositories } from '../../configuration';
import { loadGlobalVariables } from '../../utilities/misc';

console.log(chalk.yellow('Getting github credentials from environment file...'));
const globalVariablesLoaded = loadGlobalVariables();

if (globalVariablesLoaded) {
  prompt.start();
  prompt.get(inputSchema, (err, inputs) => {
    const repositories = getAllRepositories();
    tagRepositories(repositories, inputs.tagName)
      .then(() => {
        console.log(chalk.green('Finished creating production tags.'));
      })
      .catch((error) => {
        if (error) console.log(chalk.red(error));
      });
  });
}
