import { execSync } from 'child_process';
import chalk from 'chalk';

export default function createHerokuApp(appName) {
  console.log(chalk.blue('Checking if an app with this name already exists.'));
  let command = 'heroku apps --json';
  const apps = JSON.parse(execSync(command).toString());
  let appAlreadyExists = false;
  apps.forEach((app) => {
    if (app.name === appName) appAlreadyExists = true;
  });

  if (appAlreadyExists) {
    console.log(chalk.blue('Deleting the existing app.'));
    command = `heroku apps:destroy -a ${appName} -c ${appName}`;
    execSync(command);
  }

  console.log(chalk.blue(`Creating a new app named ${appName}.`));
  command = `heroku apps:create ${appName}`;
  execSync(command);
}
