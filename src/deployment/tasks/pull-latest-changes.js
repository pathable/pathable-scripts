import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { gitPull, gitIsUpdated } from '../../utilities/git';

export default function pullLatestChanges(repositories) {
  console.log(chalk.yellow('Pulling the latest changes for selected repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  const pullPromises = map(repositories, (repository) => {
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    const isUpdated = gitIsUpdated(repositoryPath);

    if (!isUpdated) {
      console.log(`Pulling latest changes for ${repository.name}.`);
      return gitPull(repository.name, repositoryPath);
    }
    console.log(`${repository.name} already has the latest changes.`);
    return Promise.resolve();
  });

  return Promise.all(pullPromises);
}
