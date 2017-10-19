import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';

/**
 * Load the global environment variables specified in the ~/.pathable-env file. Specifically we need
 * the METEOR_PACKAGE_DIRS variable from it.
 */
export default function loadGlobalVariables(checkHerokuVariables = false) {
  let result = true;

  console.log(chalk.yellow('Getting global variables from environment file...'));
  const globalEnvFile = path.resolve(path.join(process.env.HOME, '.pathable-env'));
  if (fs.existsSync(globalEnvFile)) {
    const globalEnv = dotenv.parse(fs.readFileSync(globalEnvFile));

    if (!globalEnv.METEOR_PACKAGE_DIRS || (checkHerokuVariables && !globalEnv.HEROKU_MONGO_URL)) {
      result = false;
      if (!globalEnv.METEOR_PACKAGE_DIRS) {
        console.log('~/.pathable.env does not contain the required METEOR_PACKAGE_DIRS variable.');
      }
      if (!globalEnv.HEROKU_MONGO_URL) {
        console.log('~/.pathable.env does not contain the required HEROKU_MONGO_URL variable.');
      }
    } else {
      process.env.METEOR_PACKAGE_DIRS = globalEnv.METEOR_PACKAGE_DIRS;
      console.log(`Root path for repositories is set to '${globalEnv.METEOR_PACKAGE_DIRS}'`);
      process.env.HEROKU_MONGO_URL = globalEnv.HEROKU_MONGO_URL;
      console.log(`MongoDB url for her heroku apps is set to '${globalEnv.HEROKU_MONGO_URL}'`);
    }
  } else {
    result = false;
    console.log('~/.pathable.env file was not found.');
  }

  return result;
}
