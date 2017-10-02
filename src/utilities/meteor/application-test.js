import path from 'path';
import { spawnWithLog } from '../shared';

import { getRemoteBuildStatus } from '../github';

export default function applicationTest(repositoryName, repositoryPath, envVariables) {
  return getRemoteBuildStatus(repositoryName, repositoryPath).then((status) => {
    if (status === 'success') {
      console.log(
        'Skipped running unit tests as the build status for this repository on GitHub is success.',
      );
      return Promise.resolve(0);
    }

    const deploymentTarget = process.env.DEPLOYMENT_TARGET;
    const settingsFile = path.join(repositoryPath, 'config', deploymentTarget, 'settings.json');
    const logFileName = `${repositoryName}-unit-test.log`;
    return spawnWithLog(logFileName, repositoryPath, 'meteor', [
      'test',
      '--driver-package',
      'dispatch:mocha-phantomjs',
      '--settings',
      settingsFile,
      '--port',
      envVariables.PORT,
      '--once',
    ]);
  });
}
