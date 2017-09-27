import path from 'path';
import { spawnWithLog } from '../shared';

import { getRemoteBuildStatus } from '../github';

export default function packageTest(repositoryName, repositoryPath, envVariables) {
  return getRemoteBuildStatus(repositoryName, repositoryPath).then((status) => {
    if (status === 'success') {
      console.log(
        'Skipped running unit tests as the build status for this repository on GitHub is success.',
      );
      return Promise.resolve(0);
    }

    const settingsFile = path.join(repositoryPath, 'config', 'test', 'settings.json');
    const logFileName = `unit-test-${repositoryName}.log`;
    return spawnWithLog(logFileName, repositoryPath, 'meteor', [
      'test-packages',
      '--driver-package',
      'dispatch:mocha',
      repositoryName,
      '--settings',
      settingsFile,
      '--port',
      envVariables.PORT,
      '--once',
      '--release',
      envVariables.METEOR_RELEASE,
    ]);
  });
}
