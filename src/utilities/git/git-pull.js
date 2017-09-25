import { spawnWithLog } from '../shared';

export default function gitPull(repositoryName, repositoryPath) {
  const logFileName = `git-pull-${repositoryName}.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['pull']);
}
