import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { spawnWithLog } from '../../utilities/shared';

export default function buildDeployBundle(appRepositories) {
  console.log(chalk.yellow('Building bundles for deployment to Heroku.'));
  const repositoriesRoot = path.resolve(path.join(process.env.APP_ROOT, '../'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  let promise = Promise.resolve();
  appRepositories.forEach((repository) => {
    promise = promise.then(() => {
      const repositoryPath = path.join(repositoriesRoot, repository.localPath);
      console.log(`Building bundle for ${repository.name} - ${repositoryPath}`);
      const packageOutputPath = path.join(deploymentRoot, repository.name);
      const logFileName = `${repository.name}-meteor-build.log`;
      return spawnWithLog(logFileName, repositoryPath, 'meteor', [
        'build',
        '--directory',
        packageOutputPath,
        '--server-only',
      ]).catch((error) => {
        console.log(error);
      });
    });
  });

  return promise;
}
