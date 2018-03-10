import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';
import { map } from 'lodash';

import { deployToGalaxy } from '../../utilities/meteor';

function deployRepositoryToServer(deploymentRoot, repository) {
  console.log(`Deploying ${repository.name}`);
  const repositoryPath = path.join(deploymentRoot, repository.localPath);
  const envVariables = repository.envVariables;
  return deployToGalaxy(repository.name, repositoryPath, envVariables).then((code) => {
    if (code && code !== 0) {
      console.log(`Deployment of ${repository.name} failed.`);
    }
  });
}

export default function deployToServer(
  appRepositories,
  runInParallel,
  skipActualDeployment = false,
) {
  console.log(chalk.yellow('Deploying to Server...'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  if (skipActualDeployment) return Promise.resolve(null);

  if (runInParallel === 'n') {
    // Run the individual deplyToGalaxy steps serially
    let promise = Promise.resolve();
    appRepositories.forEach((repository) => {
      promise = promise.then(() => deployRepositoryToServer(deploymentRoot, repository));
    });

    return promise;
  }

  // Run the individual deplyToGalaxy steps in parallel
  const promises = map(appRepositories, repository =>
    deployRepositoryToServer(deploymentRoot, repository),
  );

  return Promise.all(promises);
}
