import { execSync } from 'child_process';
import { Promise } from 'es6-promise';

export default function gitPushBranch(repositoryName, branchName, repositoryPath) {
  return new Promise((reject, resolve) => {
    const command = `git push origin ${branchName}`;
    const options = {
      cwd: repositoryPath,
    };
    execSync(command, options);
    resolve();
  });
}
