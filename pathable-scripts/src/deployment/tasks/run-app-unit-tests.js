import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';
import { map } from 'lodash';

import { applicationTest, packageTest } from '../../utilities/meteor';

function runUnitTestsOnRepository(inputs, deploymentRoot, repository) {
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
}

export default function runAppUnitTests(repositories, inputs) {
  console.log(chalk.yellow('Running unit tests...'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const runInParallel = inputs.doParallelDeployments;

  if (runInParallel === 'n') {
    // Run the individual unit tests serially
    let promise = Promise.resolve();
    repositories.forEach((repository) => {
      promise = promise.then(() => runUnitTestsOnRepository(inputs, deploymentRoot, repository));
    });

    return promise;
  }

  // Run the individual unit tests in parallel
  const promises = map(repositories, repository =>
    runUnitTestsOnRepository(inputs, deploymentRoot, repository),
  );
  return Promise.all(promises);
}
