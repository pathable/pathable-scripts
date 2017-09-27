import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

/**
 * This function ensures that we have the root directory for deployment created.
 * We will be cloning the repositories into this root directory.
 */
export default function createDeployDirectory(inputs, appRoot) {
  console.log(chalk.yellow('Creating deployment directory for cloning repositories'));
  const deploymentRoot = path.join(appRoot, './deploy');
  mkdirp.sync(deploymentRoot);
  return deploymentRoot;
}
