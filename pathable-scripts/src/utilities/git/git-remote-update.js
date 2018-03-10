import { spawnWithLog } from '../shared';

export default function gitRemoteUpdate(repositoryName, repositoryPath) {
  const logFileName = `${repositoryName}-git-remote-update.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['remote', 'update']);
}
