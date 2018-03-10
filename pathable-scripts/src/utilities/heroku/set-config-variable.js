import { execSync } from 'child_process';
import chalk from 'chalk';

export default function setConfigVariable(
  appName,
  gitRepositoryPath,
  configVarName,
  configVarValue,
) {
  console.log(chalk.blue(`Setting configuration variables ${configVarName} for the app.`));
  const options = {
    cwd: gitRepositoryPath,
  };
  const command = `heroku config:set ${configVarName}=${configVarValue} -a ${appName}`;
  execSync(command, options);
}
