import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';

/**
 * Load the global environment variables specified in the ~/.pathable-env file. Specifically we need
 * the METEOR_PACKAGE_DIRS variable from it.
 */
export default function loadGlobalVariables() {
  let result = true;

  console.log(chalk.yellow('Getting global variables from environment file...'));
  const globalEnvFile = path.resolve(path.join(process.env.HOME, '.pathable-env'));
  if (fs.existsSync(globalEnvFile)) {
    const globalEnv = dotenv.parse(fs.readFileSync(globalEnvFile));

    if (!globalEnv.METEOR_PACKAGE_DIRS) {
      result = false;
      console.log('~/.pathable.env does not contain the required METEOR_PACKAGE_DIRS variable.');
    } else {
      process.env.METEOR_PACKAGE_DIRS = globalEnv.METEOR_PACKAGE_DIRS;
      console.log(`Path for repositories is set to '${globalEnv.METEOR_PACKAGE_DIRS}'`);
    }
  } else {
    result = false;
    console.log('~/.pathable.env file was not found.');
  }

  return result;
}
