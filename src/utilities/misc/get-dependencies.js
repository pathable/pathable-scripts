import { uniq } from 'lodash';
import getAppDependencies from './get-app-dependencies';

/**
 * Given the names of the apps that the user wants to deploy, get all the package dependencies.
 * @param {*} appNames
 */
export default function getDependencies(appNames) {
  let dependencies = [];

  appNames.forEach((appName) => {
    const appDependencies = getAppDependencies(appName);
    dependencies = dependencies.concat(appDependencies);
  });

  return uniq(dependencies);
}
