import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import buildComponentsTree from './build-components-tree';

export default function generateSettingsJson(designRepository) {
  console.log(chalk.yellow('Generating settings.json file.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;
  const appRoot = process.env.APP_ROOT;

  const componentsFolderPath = path.resolve(
    path.join(appRoot, '../pathable-design/imports/components'),
  );
  const componentTree = buildComponentsTree(componentsFolderPath);
  const settings = JSON.stringify({
    public: {
      componentTree,
    },
  });

  const settingsJsonFile = path.join(
    deploymentRoot,
    designRepository.name,
    'bundle',
    'settings.json',
  );
  fs.writeFileSync(settingsJsonFile, settings);
}
