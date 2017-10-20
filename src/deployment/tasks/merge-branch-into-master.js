import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import {
  gitCheckoutBranch,
  gitRemoteUpdate,
  gitPull,
  gitMerge,
  gitPushBranch,
} from '../../utilities/git';

/**
 * This function performs the following tasks:-
 * - Calls 'git remote update'
 * - Switches to the specified branch by using 'git checkout -f {branch-name}'
 * - Pulls in the latest changes using 'git pull'
 * - Switches back to the master branch
 * - Merge the specified branch into master
 * - Push the changes in master back to origin
 * @param {*} repositories
 * @param {*} branchName
 */
export default function mergeBranchIntoMaster(repositories, branchName) {
  if (branchName === '') return Promise.resolve();

  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  console.log(chalk.yellow(`Merging ${branchName} branch into master for all repositories.`));

  const promises = map(repositories, (repository) => {
    const branchNames = repository.branchNames;
    if (branchNames.indexOf(branchName) === -1) {
      console.log(chalk.red(`${branchName} is not a valid branch name for ${repository.name}.`));
      return Promise.reject(new Error('Invalid branch name.'));
    }

    console.log(chalk.green(`Merging ${branchName} branch into master for ${repository.name}.`));
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    return gitRemoteUpdate(repository.name, repositoryPath)
      .then(() => {
        console.log(`Switching to ${branchName} for ${repository.name}.`);
        return gitCheckoutBranch(repository.name, branchName, repositoryPath);
      })
      .then(() => {
        console.log(`Pulling latest changes for ${repository.name}.`);
        return gitPull(repository.name, repositoryPath);
      })
      .then(() => {
        console.log(`Switching back to master for ${repository.name}.`);
        return gitCheckoutBranch(repository.name, 'master', repositoryPath);
      })
      .then(() => {
        console.log(`Merging branch ${branchName} into master for ${repository.name}.`);
        return gitMerge(repository.name, branchName, repositoryPath);
      })
      .then(() => {
        console.log(`Push master to origin for ${repository.name}.`);
        return gitPushBranch(repository.name, 'master', repositoryPath);
      });
  });

  return Promise.all(promises);
}
