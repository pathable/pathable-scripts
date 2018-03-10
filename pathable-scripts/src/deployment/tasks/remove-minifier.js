import path from 'path';
import chalk from 'chalk';

import { removeMinifier as removeMinifierFromRepository } from '../../utilities/misc';

/**
 * The .meteor/packages file in the apps contain the minifier package that is used during
 * the build process to minify the code. This removes the minifier package from the file
 * to stop minification happening during the build process.
 * @param {*} repositories
 */
export default function removeMinifier(appRepositories, minimizeCode) {
  if (minimizeCode === 'n') {
    console.log(chalk.yellow('Removing minifier package from the app repositories.'));
    const deploymentRoot = process.env.DEPLOYMENT_ROOT;
    appRepositories.forEach((repository) => {
      const repositoryPath = path.join(deploymentRoot, repository.localPath);
      removeMinifierFromRepository(repositoryPath);
    });
  }
}
