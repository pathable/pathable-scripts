import { execSync } from 'child_process';

export default function gitIsUpdated(localPath) {
  let command = 'git remote update';
  const options = {
    cwd: localPath,
  };
  execSync(command, options);

  command = 'git status s';
  const buffer = execSync(command, options);
  const index = buffer.toString().indexOf('Your branch is up-to-date with');
  return index !== -1;
}
