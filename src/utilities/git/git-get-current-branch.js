import { execSync } from 'child_process';

export default function gitGetCurrentBranch(repositoryPath) {
  const command = 'git symbolic-ref --short HEAD';
  const options = {
    cwd: repositoryPath,
  };

  const buffer = execSync(command, options);
  return buffer.toString().trim();
}
