import { spawnWithLog } from '../shared';

export function gitCheckoutBranch(repositoryName, branchName, repositoryPath) {
  const logFileName = `${repositoryName}-git-checkout.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['checkout', '-f', branchName]);
}

export function gitCheckoutTag(repositoryName, tagName, repositoryPath) {
  const logFileName = `${repositoryName}-git-checkout.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['checkout', `tags/${tagName}`]);
}
