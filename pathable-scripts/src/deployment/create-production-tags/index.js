import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import {
  loadGlobalVariables,
  startupTasks,
  tagRepositories,
  mergeBranchIntoMaster,
} from '../tasks';
import { getAllRepositories } from '../../configuration';

const globalVariablesLoaded = loadGlobalVariables();

if (globalVariablesLoaded) {
  startupTasks('production').then(() => {
    prompt.start();
    prompt.get(inputSchema, (err, inputs) => {
      const repositories = getAllRepositories();
      return mergeBranchIntoMaster(repositories, inputs.branchToMerge)
        .then(() => tagRepositories(repositories, inputs.tagName))
        .then(() => {
          console.log(chalk.green('Finished creating production tags.'));
        })
        .catch((error) => {
          if (error) console.log(chalk.red(error));
        });
    });
  });
}
