import { spawnWithLog } from '../shared';

export default function gitPull(repositoryName, repositoryPath) {
  const logFileName = `${repositoryName}-git-pull.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['pull']);
}
