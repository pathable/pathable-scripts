import path from 'path';
import { map } from 'lodash';
import { Promise } from 'es6-promise';
import chalk from 'chalk';

import { gitTagDelete } from '../../utilities/git';

export default function removeTagFromRepositories(repositories, tagName) {
  console.log(chalk.yellow('Removing tag from repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  const tagPromises = map(repositories, (repository) => {
    console.log(`Removing tag from ${repository.name} repository.`);
    // Before trying to remove the tag from the repository, ensure that it has that tag defined
    if (repository.tags.indexOf(tagName) !== -1) {
      const repositoryPath = path.join(deploymentRoot, repository.localPath);
      return gitTagDelete(repository.name, repositoryPath, tagName);
    }

    console.log(`Tag ${tagName} does not exist on ${repository.name} repository.`);
    return Promise.resolve();
  });

  return Promise.all(tagPromises);
}
