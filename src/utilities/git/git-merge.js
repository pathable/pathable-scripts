import { execSync } from 'child_process';
import { Promise } from 'es6-promise';

export default function gitMerge(repositoryName, branchName, repositoryPath) {
  return new Promise((reject, resolve) => {
    const command = `git merge ${branchName}`;
    const options = {
      cwd: repositoryPath,
    };
    execSync(command, options);
    resolve();
  });
}
