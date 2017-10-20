import path from 'path';
import chalk from 'chalk';

import { gitGetTagsList } from '../../../utilities/git';

/**
 * This prints out the list of 5 most recent tags that have been created on the repositories.
 * The list of tags is built taking into account wwhether we are deploying to staging or
 * production. For staging it would filter the tags based on the string 'staging-*'.
 * For production, it would filter on 'production-*'.
 * @param {*} repositories
 */
export default function getTagsList(repositories) {
  console.log(chalk.yellow('Loading 5 most recent tags for the repositories.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;
  repositories.forEach((repository) => {
    const repositoryRef = repository;
    const repositoryPath = path.join(deploymentRoot, repositoryRef.localPath);
    repositoryRef.tags = gitGetTagsList(repositoryPath, deploymentTarget);
    console.log(`${repository.name} - [${repositoryRef.tags.join(', ')}]`);
  });
}
