import fs from 'fs';
import path from 'path';

import { getRepositoryByName } from '../../configuration';

/**
 * We are going to open up the ".meteor/packages" file in the app folder, and
 * get all the packages listed in there starting with the string "pathable".
 * @param {*} appName
 * @param {*} deploymentRoot
 */
export default function getAppDependencies(appName) {
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const dependencies = [];
  const repository = getRepositoryByName(appName);
  if (!repository) {
    throw new Error(`Repository object was not found in configuration for ${appName}`);
  }

  const packagesFile = path.join(deploymentRoot, repository.localPath, '.meteor/packages');
  const fileContent = fs.readFileSync(packagesFile, { encoding: 'utf8' });
  const lines = fileContent.split(/[\n\r]/);
  lines.forEach((line) => {
    if (line.startsWith('pathable-')) {
      const packageName = line.split(' ')[0];
      dependencies.push(packageName);
    }
  });

  return dependencies;
}
