import path from 'path';
import fs from 'fs';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { getAllRepositories } from '../../../configuration';
import { gitClone } from '../../../utilities/git';

export default function cloneRepositories() {
  console.log(chalk.yellow('Cloning repositories into the deployment folder.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const repositories = getAllRepositories();

  let promise = Promise.resolve();
  repositories.forEach((repository) => {
    promise = promise.then(() => {
      const repositoryPath = path.join(deploymentRoot, repository.localPath);
      const exists = fs.existsSync(repositoryPath);
      if (exists) {
        console.log(`${repository.name} already exists. Skipping.`);
        return Promise.resolve();
      }

      console.log(`${repository.name} does not exist. Cloning...`);
      return gitClone(repository.name, repository.remoteUrl, repositoryPath).then((code) => {
        if (code && code !== 0) throw new Error(`Child process exited with code ${code}`);
      });
    });
  });

  return promise;
}
