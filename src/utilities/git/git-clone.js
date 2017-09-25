import { spawnWithLog } from '../shared';

export default function gitClone(repositoryName, remotePath, repositoryPath) {
  const logFileName = `git-clone-${repositoryName}.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['clone', remotePath, repositoryPath]);
}
