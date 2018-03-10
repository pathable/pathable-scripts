import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default function generateRootPackageJson(appRepositories) {
  console.log(chalk.yellow('Generating package.json files in the root of app bundles.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  appRepositories.forEach((repository) => {
    const nodeVersionFile = path.join(
      deploymentRoot,
      repository.name,
      'bundle',
      '.node_version.txt',
    );
    const nodeVersion = fs
      .readFileSync(nodeVersionFile)
      .toString()
      .trim()
      .slice(1);

    const packageJsonFile = path.join(deploymentRoot, repository.name, 'bundle', 'package.json');

    const packageJsonContent = `{
      "name": "meteor-dev-bundle",
      "version": "0.0.0",
      "scripts": {
        "postinstall": "cd programs/server && npm install"
      },
      "engines": { "node": "${nodeVersion}" }
    }`;
    fs.writeFileSync(packageJsonFile, packageJsonContent);
  });
}
