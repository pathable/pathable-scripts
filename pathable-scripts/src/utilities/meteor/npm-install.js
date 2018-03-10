import { spawnWithLog } from '../shared';

export default function npmInstall(repositoryName, repositoryPath) {
  const logFileName = `${repositoryName}-npm-install.log`;
  return spawnWithLog(logFileName, repositoryPath, 'meteor', ['npm', 'install']);
}
