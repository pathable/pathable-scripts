import path from 'path';
import chalk from 'chalk';

import { gitGetBranchNames } from '../../../utilities/git';

/**
 * This loads the names of the branches for each of the repositories and saves the list
 * on the repository objects. We can use these later to verify the input to ensure that
 * any branch name entered is a valid branch name.
 * @param {*} repositories
 */
export default function getTagsList(repositories) {
  console.log(chalk.yellow('Loading branch names for the repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;
  repositories.forEach((repository) => {
    const repositoryRef = repository;
    const repositoryPath = path.join(deploymentRoot, repositoryRef.localPath);
    repositoryRef.branchNames = gitGetBranchNames(repositoryPath, deploymentTarget);
  });
}
