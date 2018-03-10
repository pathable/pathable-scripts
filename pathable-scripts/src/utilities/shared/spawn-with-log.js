import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Promise } from 'es6-promise';

export default function spawnWithLog(logFileName, workingDirectory, command, args) {
  return new Promise((reject, resolve) => {
    let commandString = command;
    if (args) {
      args.forEach((arg) => {
        commandString = commandString.concat(` ${arg}`);
      });
    }

    const logFile = path.join(process.env.LOGS_ROOT, logFileName);
    const out = fs.openSync(logFile, 'a');
    const err = fs.openSync(logFile, 'a');
    const options = {
      cwd: workingDirectory,
      detached: true,
      stdio: ['ignore', out, err],
    };

    const childProcess = spawn(command, args, options);
    childProcess.on('error', (error) => {
      reject(error);
    });

    childProcess.on('close', (code) => {
      resolve(code);
    });
    //    });
  }).catch((error) => {
    if (error) throw error;
  });
}
