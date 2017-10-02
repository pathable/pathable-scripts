import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { createTag } from '../../utilities/github';

export default function tagRepositories(repositories, tagName) {
  console.log(chalk.yellow(`Creating tag ${tagName} on repositories.`));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  const tagPromises = map(repositories, (repository) => {
    console.log(`Creating tag on ${repository.name} repository.`);
    const repositoryPath = path.join(deploymentRoot, repository.localPath);
    return createTag(repository.name, repositoryPath, tagName);
  });

  return Promise.all(tagPromises);
}
