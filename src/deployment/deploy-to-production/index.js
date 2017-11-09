import prompt from 'prompt';
import chalk from 'chalk';

import inputSchema from './input-schema';
import { getRepositoriesByName, PackagesContainerRepositoryName } from '../../configuration';
import {
  loadGlobalVariables,
  startupTasks,
  checkoutTag,
  updatePackageJsons,
  loadEnvVariables,
  installNpmDependenciesForRepositories,
  installNpmDependenciesForPackages,
  injectTagNameIntoSettings,
  runAppUnitTests,
  deployToServer,
} from '../tasks';

import { loggedInToMeteor } from '../../utilities/meteor';
import { getAppsToBuild, getDependencies } from '../../utilities/misc';

let loggedIn;

const globalVariablesLoaded = loadGlobalVariables();
if (globalVariablesLoaded) {
  console.log(chalk.yellow('Checking meteor logged in status...'));
  loggedIn = loggedInToMeteor();
}

if (globalVariablesLoaded && loggedIn) {
  startupTasks('production').then(() => {
    prompt.start();
    prompt
      .get(inputSchema, (err, inputs) => {
        const appNames = getAppsToBuild(inputs);
        const packageNames = getDependencies(appNames);
        const repositoryNames = appNames.concat(PackagesContainerRepositoryName);
        const appRepositories = getRepositoriesByName(appNames);
        const repositories = getRepositoriesByName(repositoryNames);

        checkoutTag(repositories, inputs.tagName);
        updatePackageJsons(repositories);
        loadEnvVariables(repositories);
        injectTagNameIntoSettings(appRepositories, inputs.tagName);
        return installNpmDependenciesForRepositories(repositories)
          .then(() => installNpmDependenciesForPackages(packageNames))
          .then(() => runAppUnitTests(appRepositories, inputs))
          .then(() => deployToServer(appRepositories, inputs.doParallelDeployments));
      })
      .then(() => {
        console.log(chalk.green('Finished deployment.'));
      })
      .catch((error) => {
        if (error) console.log(chalk.red(error));
      });
  });
}
