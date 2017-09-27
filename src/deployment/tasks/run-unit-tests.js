import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { applicationTest, packageTest } from '../../utilities/meteor';

export default function runUnitTests(inputs, repositories) {
  console.log(chalk.yellow('Running unit tests...'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  let promise = Promise.resolve();
  repositories.forEach((repository) => {
    promise = promise.then(() => {
      const repositoryPath = path.join(deploymentRoot, repository.localPath);
      const envVariables = repository.envVariables;
      if (repository.isApp && inputs.runAppUnitTests === 'y') {
        console.log(`Running unit tests for ${repository.name}`);
        return applicationTest(repository.name, repositoryPath, envVariables);
      }

      if (repository.testPackage && inputs.runPackageUnitTests === 'y') {
        console.log(`Running unit tests for ${repository.name}`);
        return packageTest(repository.name, repositoryPath, envVariables);
      }

      console.log(`Skipped running unit tests for ${repository.name} because of user input.`);
      return Promise.resolve();
    });
  });

  return promise;
}
