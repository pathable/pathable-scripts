import path from 'path';

import { getAllRepositories, PackagesRoot } from '../../../configuration';
import { cloneRepositories, checkoutSources, getTagsList, getBranchNames } from './';
import { createDeployDirectory, createLogsDirectory } from '../../../utilities/misc';

export default function startupTasks(deploymentTarget) {
  const allRepositories = getAllRepositories();
  const appRoot = path.resolve(path.join(__dirname, '../../../../'));
  const deploymentRoot = createDeployDirectory(appRoot);
  const packagesDir = path.resolve(path.join(deploymentRoot, PackagesRoot));
  const logsRoot = createLogsDirectory(appRoot);

  // These environment variables are used by the meteor build utility
  process.env.TOOL_NODE_FLAGS = '--max-old-space-size=4096';
  process.env.METEOR_PACKAGE_DIRS = packagesDir;
  // These environment variables are for internal use of this utility
  process.env.DEPLOYMENT_ROOT = deploymentRoot;
  process.env.LOGS_ROOT = logsRoot;
  process.env.DEPLOYMENT_TARGET = deploymentTarget;

  return cloneRepositories()
    .then(() => {
      const branchName = deploymentTarget === 'staging' ? 'development' : 'master';
      return checkoutSources(allRepositories, branchName);
    })
    .then(() => getTagsList(allRepositories))
    .then(() => getBranchNames(allRepositories));
}
