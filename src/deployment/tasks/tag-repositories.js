import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { createTag } from '../../utilities/github';

export default function tagRepositories(repositories) {
  console.log(chalk.yellow('Creating tags on repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  const tagPromises = map(repositories, (repository) => {
    console.log(chalk.yellow(`Creating tag on ${repository.name} repository.`));
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    return createTag(repository.name, repositoryPath);
  });

  return Promise.all(tagPromises);
}
