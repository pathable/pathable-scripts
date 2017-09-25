import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * Load the environment variables specified in the config/.env file and the deployment target
 * specific config/staging/.env or config/production/.env file. Combine these two to get the
 * final environment variables.
 * @param {*} repositoryPath
 */
export default function loadVariables(repositoryPath) {
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;

  const rootEnvFile = path.join(repositoryPath, 'config', '.env');
  let rootEnvConfig = {};
  if (fs.existsSync(rootEnvFile)) {
    rootEnvConfig = dotenv.parse(fs.readFileSync(rootEnvFile));
  }

  const deploymentTargetEnvFile = path.join(repositoryPath, 'config', deploymentTarget, '.env');
  let deploymentTargetEnvConfig = {};
  if (fs.existsSync(deploymentTargetEnvFile)) {
    deploymentTargetEnvConfig = dotenv.parse(fs.readFileSync(deploymentTargetEnvFile));
  }

  const envConfig = Object.assign({}, rootEnvConfig, deploymentTargetEnvConfig);
  return envConfig;
}
