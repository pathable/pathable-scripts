import path from 'path';
import chalk from 'chalk';

import { loadEnvVariables as loadEnvVariablesForRepository } from '../../utilities/misc';

/**
 * This loads the environment variables specified in the config/.env file and the deployment target
 * specific config/staging/.env or config/production/.env file. Combine these two to get the
 * final environment variables.
 * The variables that we need from these for ddeployment to galaxy servers are:-
 * - GALAXY_HOSTNAME
 * - DEPLOY_HOSTNAME
 * We also need the following for running unit tests.
 * - PORT
 * - METEOR_RELEASE
 * - MONGO_URL
 * Since these vary for each application, we retrieve and store them in the individual repository.
 * @param {*} repositories
 */
export default function loadEnvVariables(repositories) {
  console.log(chalk.yellow('Loading environment variables.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  repositories.forEach((repository) => {
    const repositoryRef = repository;
    const repositoryPath = path.join(deploymentRoot, repositoryRef.localPath);
    repositoryRef.envVariables = loadEnvVariablesForRepository(repositoryPath);
  });
}
