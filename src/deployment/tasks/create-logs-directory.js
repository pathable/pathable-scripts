import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

/**
 * This function ensures that we have the root directory for deployment created.
 * We will be cloning the repositories into this root directory.
 */
export default function createLogsDirectory(inputs, appRoot) {
  console.log(chalk.yellow('Creating logs directory.'));
  const logsRoot = path.join(appRoot, './logs');
  mkdirp.sync(logsRoot);

  fs.readdir(logsRoot, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.unlink(path.join(logsRoot, file), (error) => {
        if (error) throw error;
      });
    });
  });

  return logsRoot;
}
