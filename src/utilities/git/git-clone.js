import { spawnWithLog } from '../shared';

export default function gitClone(repositoryName, remotePath, repositoryPath) {
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const logFileName = `git-clone-${repositoryName}.log`;
  return spawnWithLog(logFileName, deploymentRoot, 'git', ['clone', remotePath, repositoryPath]);
}
