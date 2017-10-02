import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getRepositoriesByName } from '../../configuration';
import {
  startupTasks,
  checkoutTag,
  updatePackageJsons,
  loadEnvVariables,
  installNpmDependencies,
  injectTagNameIntoSettings,
  runUnitTests,
  deployToServer,
} from '../tasks';

import { loggedInToMeteor } from '../../utilities/meteor';
import { getAppsToBuild, getDependencies, loadGlobalVariables } from '../../utilities/misc';

let loggedIn;

console.log(chalk.yellow('Getting github credentials from environment file...'));
const globalVariablesLoaded = loadGlobalVariables();
if (globalVariablesLoaded) {
  console.log(chalk.yellow('Checking meteor logged in status...'));
  loggedIn = loggedInToMeteor();
}

if (globalVariablesLoaded && loggedIn) {
  startupTasks('staging').then(() => {
    prompt.start();
    prompt
      .get(inputSchema, (err, inputs) => {
        const appNames = getAppsToBuild(inputs);
        const packageNames = getDependencies(appNames);
        const repositoryNames = appNames.concat(packageNames);
        const appRepositories = getRepositoriesByName(appNames);
        const repositories = getRepositoriesByName(repositoryNames);

        checkoutTag(repositories, inputs.tagName);
        updatePackageJsons(repositories);
        loadEnvVariables(repositories);
        injectTagNameIntoSettings(appRepositories, inputs.tagName);
        return installNpmDependencies(repositories)
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
