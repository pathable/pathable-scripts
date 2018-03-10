import fs from 'fs';
import path from 'path';

/**
 * Update the package.json file for the repository, removing the scripts section from it.
 * This is so that we can avoid running p-* scripts when run npm commands like 'npm install'.
 * @param {*} repository
 */
export default function updatePackageJson(repositoryPath) {
  const packageFile = path.join(repositoryPath, 'package.json');
  const packageFileContents = fs.readFileSync(packageFile);
  const packageFileJson = JSON.parse(packageFileContents);

  delete packageFileJson.scripts;
  fs.writeFileSync(packageFile, JSON.stringify(packageFileJson));
}
