import path from 'path';
import chalk from 'chalk';

import { updatePackageJson } from '../../utilities/misc';

/**
 * The package.json files of each project contains script sections that refer to the p-*
 * scripts. So for instance doing 'npm install' in the app directory would trigger p-install.
 * In order to avoid that, we are going to load the package.json, remove the scripts section
 * from it, and write it back.
 * @param {*} repositories
 */
export default function updatePackageJsons(repositories) {
  console.log(chalk.yellow('Updating package.json files in the repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  repositories.forEach((repository) => {
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    updatePackageJson(repositoryPath);
  });
}
