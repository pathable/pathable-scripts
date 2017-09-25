import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { npmInstall } from '../../utilities/meteor';

export default function installNpmDependencies(repositories) {
  console.log(chalk.yellow('Installing npm dependencies...'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  let promise = Promise.resolve();
  repositories.forEach((repository) => {
    promise = promise.then(() => {
      console.log(`Installing dependencies for ${repository.name}`);
      const repositoryPath = path.join(deploymentRoot, repository.localPath);
      return npmInstall(repository.name, repositoryPath);
    });
  });

  return promise;
}
