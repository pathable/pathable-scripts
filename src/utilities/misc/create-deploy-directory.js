import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

/**
 * This function ensures that we have the root directory for deployment created.
 * We will be cloning the repositories into this root directory.
 */
export function createDeployDirectory(appRoot) {
  const deploymentRoot = path.join(appRoot, './deploy');
  console.log(chalk.yellow(`Creating deployment directory ${deploymentRoot}.`));
  mkdirp.sync(deploymentRoot);
  return deploymentRoot;
}

export function createDeployDirectoryForHeroku(appRoot) {
  const deploymentRoot = path.join(appRoot, './heroku');
  console.log(chalk.yellow(`Creating heroku deployment directory ${deploymentRoot}.`));
  mkdirp.sync(deploymentRoot);
  return deploymentRoot;
}
