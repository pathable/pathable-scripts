import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { npmInstall } from '../../utilities/meteor';

export function installNpmDependenciesForRepositories(repositories) {
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

export function installNpmDependenciesForPackages(packageNames) {
  console.log(chalk.yellow('Installing npm dependencies for packages...'));
  const packagesDir = process.env.METEOR_PACKAGE_DIRS;

  let promise = Promise.resolve();
  packageNames.forEach((packageName) => {
    promise = promise.then(() => {
      console.log(`Installing dependencies for ${packageName}`);
      const packagePath = path.join(packagesDir, packageName);
      return npmInstall(packageName, packagePath);
    });
  });

  return promise;
}
