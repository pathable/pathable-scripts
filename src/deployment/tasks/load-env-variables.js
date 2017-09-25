import path from 'path';
import chalk from 'chalk';

import { loadVariables } from '../../utilities/misc';

export default function loadEnvironmentVariables(repositories) {
  console.log(chalk.yellow('Loading environment variables.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  repositories.forEach((repository) => {
    const repositoryRef = repository;
    const repositoryPath = path.join(deploymentRoot, repositoryRef.localPath);
    repositoryRef.envVariables = loadVariables(repositoryPath);
  });
}
