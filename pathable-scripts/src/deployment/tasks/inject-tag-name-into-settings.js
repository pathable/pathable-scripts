import path from 'path';
import chalk from 'chalk';

import { injectTagNameIntoSettings as injectTagNameIntoSettingsForRepository } from '../../utilities/misc';

/**
 * Load the deployment target specific 'settings.json file' and add a new variable 'tagName'
 * in the public section. This is so that we can look at a running container on galaxy and
 * determine the name of the tag that was used to build the application.
 * @param {*} repositories
 */
export default function injectTagNameIntoSettings(repositories, tagName) {
  console.log(chalk.yellow('Injecting tag name into settings.json files.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  repositories.forEach((repository) => {
    const repositoryRef = repository;
    const repositoryPath = path.join(deploymentRoot, repositoryRef.localPath);
    injectTagNameIntoSettingsForRepository(repositoryPath, tagName);
  });
}
