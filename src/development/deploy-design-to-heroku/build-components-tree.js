/* eslint-disable no-param-reassign */
import fs from 'fs';
import { each, some } from 'lodash';

function getIsComponentFolder(path) {
  const file = fs.statSync(path);

  if (file.isFile()) return false;

  const children = fs.readdirSync(path);
  const containsComponentFile = some(children, (child) => {
    const hasKeyword = child.indexOf('component') !== -1;
    return hasKeyword;
  });

  if (containsComponentFile) return true;
  return false;
}

function getChildFiles(path) {
  return fs.readdirSync(path);
}

function getIsFile(path) {
  const file = fs.statSync(path);
  return file.isFile();
}

export default function buildComponentsTree(componentsPath, tree = {}) {
  const files = fs.readdirSync(componentsPath);
  each(files, (file) => {
    const filePath = `${componentsPath}/${file}`;
    const isComponentFolder = getIsComponentFolder(filePath);

    if (isComponentFolder) {
      const childFiles = getChildFiles(filePath);
      tree[file] = childFiles;
    } else if (!getIsFile(filePath)) {
      const subTree = {};
      tree[file] = subTree;
      buildComponentsTree(filePath, subTree);
    }
  });

  return tree;
}
