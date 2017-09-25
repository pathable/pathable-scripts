import path from 'path';
import fs from 'fs';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { getAllRepositories } from '../../configuration';
import { gitClone } from '../../utilities/git';

export default function cloneRepositories() {
  console.log(chalk.yellow('Cloning repositories into the deployment folder.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const repositories = getAllRepositories();

  const clonePromises = map(repositories, (repository) => {
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    const exists = fs.existsSync(repositoryPath);

    if (exists) {
      console.log(`${repository.name} already exists. Skipping.`);
      return Promise.resolve();
    }

    console.log(`${repository.name} does not exist. Initiating cloning...`);
    return gitClone(repository.name, repository.remoteUrl, repositoryPath);
  });

  return Promise.all(clonePromises);
}
