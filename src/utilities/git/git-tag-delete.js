import { execSync } from 'child_process';
import { Promise } from 'es6-promise';

export default function gitTagDelete(repositoryName, repositoryPath, tagName) {
  return new Promise((reject, resolve) => {
    let command = `git tag -d ${tagName}`;
    const options = {
      cwd: repositoryPath,
    };
    execSync(command, options);

    command = `git push origin :refs/tags/${tagName}`;
    execSync(command, options);
    resolve();
  });
}
