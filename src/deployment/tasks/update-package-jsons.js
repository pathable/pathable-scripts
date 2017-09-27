import path from 'path';
import chalk from 'chalk';

import { updatePackageJson } from '../../utilities/misc';

export default function updatePackageJsons(repositories) {
  console.log(chalk.yellow('Updating package.json files in the repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  repositories.forEach((repository) => {
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    updatePackageJson(repositoryPath);
  });
}
