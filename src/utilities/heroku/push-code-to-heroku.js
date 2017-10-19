import { execSync } from 'child_process';
import chalk from 'chalk';

export default function pushCodeToHeroku(appName, gitRepositoryPath) {
  const options = {
    cwd: gitRepositoryPath,
  };

  console.log(chalk.blue('Creating the git repository.'));
  let command = 'git init';
  execSync(command, options);

  command = `heroku git:remote -a ${appName}`;
  execSync(command, options);

  console.log(chalk.blue('Adding code to the git repository.'));
  command = 'git add .';
  execSync(command, options);

  command = 'git commit -m "Initial commit!"';
  execSync(command, options);

  console.log(chalk.blue('Pushing the git repository to heroku, and initiating build.'));
  command = 'git push heroku master';
  execSync(command, options);
}
