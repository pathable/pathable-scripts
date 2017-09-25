import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { gitGetCurrentBranch, gitCheckout } from '../../utilities/git';

export default function checkoutBranches(repositories) {
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;
  const branchName = deploymentTarget === 'staging' ? 'development' : 'master';
  console.log(chalk.yellow(`Switching to ${branchName} branch for all repositories.`));

  const checkoutPromises = map(repositories, (repository) => {
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    const currentBranchName = gitGetCurrentBranch(repositoryPath);
    if (currentBranchName !== branchName) {
      console.log(`${repository.name} is currently on ${currentBranchName}. Switching...`);
      return gitCheckout(repository.name, branchName, repositoryPath);
    }
    console.log(`${repository.name} is already on ${branchName}.`);
    return Promise.resolve();
  });

  return Promise.all(checkoutPromises);
}
