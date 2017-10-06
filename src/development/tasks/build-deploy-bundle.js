import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { spawnWithLog } from '../../utilities/shared';

export default function buildDeployBundle(appRepositories) {
  console.log(chalk.yellow('Building bundles for deployment to Heroku.'));
  const repositoriesRoot = process.env.METEOR_PACKAGE_DIRS;
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  let promise = Promise.resolve();
  appRepositories.forEach((repository) => {
    promise = promise.then(() => {
      console.log(`Building bundle for ${repository.name}`);
      const repositoryPath = path.join(repositoriesRoot, repository.localPath);
      const packageOutputPath = path.join(deploymentRoot, repository.name);
      const logFileName = `${repository.name}-meteor-build.log`;
      return spawnWithLog(logFileName, repositoryPath, 'meteor', [
        'build',
        '--directory',
        packageOutputPath,
        '--server-only',
      ]);
    });
  });

  return promise;
}
