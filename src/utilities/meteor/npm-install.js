import { spawnWithLog } from '../shared';

export default function npmInstall(repositoryName, repositoryPath) {
  const logFileName = `npm-install-${repositoryName}.log`;
  return spawnWithLog(logFileName, repositoryPath, 'meteor', ['npm', 'install']);
}
