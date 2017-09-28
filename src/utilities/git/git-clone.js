import { spawnWithLog } from '../shared';

export default function gitClone(repositoryName, remotePath, repositoryPath) {
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const logFileName = `${repositoryName}-git-clone.log`;
  return spawnWithLog(logFileName, deploymentRoot, 'git', ['clone', remotePath, repositoryPath]);
}
