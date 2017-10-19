import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default function setNodeEngine(appRepositories) {
  console.log(chalk.yellow('Generating Procfiles for repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  appRepositories.forEach((repository) => {
    const procFile = path.join(deploymentRoot, repository.name, 'bundle', 'Procfile');
    fs.writeFileSync(procFile, 'web: node main.js');
  });
}
