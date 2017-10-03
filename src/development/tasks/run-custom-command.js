import path from 'path';
import chalk from 'chalk';
import { Promise } from 'es6-promise';

import { spawnWithLog } from '../../utilities/shared';

export default function runCustomCommand(repositories, commandString) {
  console.log(chalk.yellow(`Running command '${commandString}' across all repositories.`));
  const repositoriesRoot = process.env.METEOR_PACKAGE_DIRS;

  const arr = commandString.split(' ');
  const command = arr[0];
  const args = arr.slice(1);

  let promise = Promise.resolve();
  repositories.forEach((repository) => {
    promise = promise.then(() => {
      console.log(`Running command for ${repository.name}`);
      const repositoryPath = path.join(repositoriesRoot, repository.localPath);
      const logFileName = `${repository.name}-${command}.log`;
      return spawnWithLog(logFileName, repositoryPath, command, args);
    });
  });

  return promise;
}
