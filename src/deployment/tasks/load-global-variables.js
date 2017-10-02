import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';

/**
 * Load the global environment variables specified in the ~/.pathable-env file. Specifically we need
 * the github credentials from that file.
 */
export default function loadGlobalVariables() {
  let result = true;

  console.log(chalk.yellow('Getting github credentials from environment file...'));
  const globalEnvFile = path.resolve(path.join(process.env.HOME, '.pathable-env'));
  if (fs.existsSync(globalEnvFile)) {
    const globalEnv = dotenv.parse(fs.readFileSync(globalEnvFile));

    if (!globalEnv.GITHUB_USERNAME || !globalEnv.GITHUB_TOKEN) {
      result = false;
      console.log('~/.pathable.env does not contain the required github credentials.');
    } else {
      process.env.GITHUB_USERNAME = globalEnv.GITHUB_USERNAME;
      process.env.GITHUB_TOKEN = globalEnv.GITHUB_TOKEN;
    }
  } else {
    result = false;
    console.log('~/.pathable.env file was not found.');
  }

  return result;
}
