import { spawnWithLog } from '../shared';

export default function gitCheckout(repositoryName, branchName, repositoryPath) {
  const logFileName = `git-checkout-${repositoryName}.log`;
  return spawnWithLog(logFileName, repositoryPath, 'git', ['checkout', '-f', branchName]);
}
