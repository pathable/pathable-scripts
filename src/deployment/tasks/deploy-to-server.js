import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { deployToGalaxy } from '../../utilities/meteor';

export default function deployToServer(appRepositories) {
  console.log(chalk.yellow('Deploying to Server...'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  let promise = Promise.resolve();
  appRepositories.forEach((repository) => {
    promise = promise.then(() => {
      console.log(`Deploying ${repository.name}`);
      const repositoryPath = path.join(deploymentRoot, repository.localPath);
      const envVariables = repository.envVariables;
      return deployToGalaxy(repository.name, repositoryPath, envVariables);
    });
  });

  return promise;
}
