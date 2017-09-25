import path from 'path';
import { spawnWithLog } from '../shared';

export default function deployToGalaxy(repositoryName, repositoryPath, envVariables) {
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;
  const settingsFile = path.join(repositoryPath, 'config', deploymentTarget, 'settings.json');
  const logFileName = `meteor-deploy-${repositoryName}.log`;
  const galaxyHostName = envVariables.GALAXY_HOSTNAME;
  process.env.DEPLOY_HOSTNAME = envVariables.DEPLOY_HOSTNAME;

  return spawnWithLog(logFileName, repositoryPath, 'meteor', [
    'deploy',
    galaxyHostName,
    '--settings',
    settingsFile,
  ]);
}
