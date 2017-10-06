import path from 'path';
import chalk from 'chalk';

import { gitGetCurrentBranch } from '../../utilities/git';

export default function getCurrentBranchs(repositories) {
  console.log(chalk.yellow('Getting current branch names for all repositories.'));
  const repositoriesRoot = process.env.METEOR_PACKAGE_DIRS;

  repositories.forEach((repository) => {
    const repositoryPath = path.join(repositoriesRoot, repository.localPath);
    const branchName = gitGetCurrentBranch(repositoryPath);
    console.log(`${repository.name} is currently on ${branchName}`);
  });
}
