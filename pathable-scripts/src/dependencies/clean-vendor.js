import fs from 'fs';
import fsp from 'fs-extra-promise';
import includes from 'lodash.includes';

import { vendorDir } from './constants';

const excludedFolders = ['node_modules', 'scripts'];

export default () => {
  const packageInfo = JSON.parse(fs.readFileSync(`${vendorDir}/package.json`, 'utf8'));
  const packageName = packageInfo.name;
  const dependencies = Object.keys(packageInfo.dependencies);

  // eslint-disable-next-line
  console.warn(`\x1b[32mClearing unused dependencies exports from ${packageName}...\x1b[0m`);

  const works = [];
  fs.readdir(`${vendorDir}/`, (err, files) => {
    if (err) throw new Error(err);

    files.forEach((file) => {
      const filePath = `${vendorDir}/${file}`;
      if (
        fs.existsSync(filePath) &&
        fs.statSync(filePath).isDirectory() &&
        !includes(excludedFolders, file) &&
        fs.existsSync(`${filePath}/.exported`) &&
        !includes(dependencies, file)
      ) {
        const work = fsp.remove(filePath);
        works.push(work);
        // eslint-disable-next-line
        console.warn(`\x1b[34mUnused dependency cleared: ${file}\x1b[0m`);
      }
    });
  });

  Promise.all(works).then(() => {
    // eslint-disable-next-line
    console.warn(`\x1b[32mUnused dependencies exports cleared.\x1b[0m`);
  });
};
