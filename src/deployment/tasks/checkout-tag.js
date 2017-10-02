import path from 'path';
import chalk from 'chalk';

import { gitCheckoutTag } from '../../utilities/git';

/**
 * This function performs the following tasks:-
 * - Calls 'git checkout tags/{tagName}' for all repositories
 * This creates a detached head which we can then modify, and deploy.
 * @param {*} repositories
 */
export default function checkoutTag(repositories, tagName) {
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  console.log(chalk.yellow(`Checkout ${tagName} tag for all repositories.`));
  repositories.forEach((repository) => {
    const repositoryRef = repository;
    const repositoryPath = path.join(deploymentRoot, repositoryRef.localPath);
    return gitCheckoutTag(repository.name, tagName, repositoryPath);
  });
}
