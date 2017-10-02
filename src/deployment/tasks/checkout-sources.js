import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { gitCheckoutBranch, gitRemoteUpdate, gitPull } from '../../utilities/git';

/**
 * This function performs the following tasks:-
 * - Calls 'git remote update'
 * - Switches to the appropriate branch by using 'git checkout -f {branch-name}'
 * - Pulls in the latest changes using 'git pull'
 * @param {*} repositories
 */
export default function checkoutSources(repositories) {
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;
  const branchName = deploymentTarget === 'staging' ? 'development' : 'master';
  console.log(chalk.yellow(`Switching to ${branchName} branch for all repositories.`));

  const promises = map(repositories, (repository) => {
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    return gitRemoteUpdate(repository.name, repositoryPath)
      .then(() => gitCheckoutBranch(repository.name, branchName, repositoryPath))
      .then(() => {
        console.log(`Pulling latest changes for ${repository.name}.`);
        return gitPull(repository.name, repositoryPath);
      });
  });

  return Promise.all(promises);
}
