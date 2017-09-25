import { execSync } from 'child_process';

export default function gitIsUpdated(localPath) {
  const command = 'git status s';
  const options = {
    cwd: localPath,
  };

  const buffer = execSync(command, options);
  const index = buffer.toString().indexOf('Your branch is up-to-date with');
  return index !== -1;
}
