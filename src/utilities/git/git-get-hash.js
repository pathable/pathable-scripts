import { execSync } from 'child_process';

export default function gitGetHash(repositoryPath) {
  const command = 'git rev-parse HEAD';
  const options = {
    cwd: repositoryPath,
  };

  const buffer = execSync(command, options);
  return buffer.toString().trim();
}
