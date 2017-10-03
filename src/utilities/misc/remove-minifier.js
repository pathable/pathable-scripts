import fs from 'fs';
import path from 'path';

/**
 * Update the .meteor/packages file and remove the minifier package from it. The package that
 * we want to remove is named 'abernix:standard-minifier-js'
 * @param {*} repository
 */
export default function removeMinifier(repositoryPath) {
  const packageFile = path.join(repositoryPath, '.meteor', 'packages');
  const fileContents = fs.readFileSync(packageFile).toString();
  const updatedFileContents = fileContents.replace(/abernix:standard-minifier-js/g, '');
  fs.writeFileSync(packageFile, updatedFileContents);
}
