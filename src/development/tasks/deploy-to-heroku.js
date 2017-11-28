/* eslint "no-useless-escape": "off" */
import path from 'path';
import chalk from 'chalk';

import { createHerokuApp, setConfigVariable, pushCodeToHeroku } from '../../utilities/heroku';

function setConfigVariablesForApp(repositoryName, gitRepositoryPath, featurePrefix) {
  const mongoUrl = process.env.HEROKU_MONGO_URL;
  const appName = featurePrefix ? `${featurePrefix}-${repositoryName}` : repositoryName;

  setConfigVariable(appName, gitRepositoryPath, 'MONGO_URL', mongoUrl);
  setConfigVariable(appName, gitRepositoryPath, 'METEOR_SETTINGS', '"$(< settings.json)"');
  setConfigVariable(appName, gitRepositoryPath, 'ROOT_URL', `https://${appName}.herokuapp.com/`);
  setConfigVariable(
    appName,
    gitRepositoryPath,
    'MAILER_APP_URL',
    `https://${featurePrefix}-pathable-mailer.herokuapp.com/`,
  );
}

export default function deployToHeroku(appRepositories, featurePrefix) {
  console.log(chalk.yellow('Deploying apps to Heroku.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  appRepositories.forEach((repository) => {
    const appName = featurePrefix ? `${featurePrefix}-${repository.name}` : repository.name;
    console.log(`Deploying ${appName}`);
    createHerokuApp(appName);
    const gitRepositoryPath = path.join(deploymentRoot, repository.name, 'bundle');
    pushCodeToHeroku(appName, gitRepositoryPath);
    setConfigVariablesForApp(repository.name, gitRepositoryPath, featurePrefix);
  });
}
