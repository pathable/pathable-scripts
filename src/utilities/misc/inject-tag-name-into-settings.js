import fs from 'fs';
import path from 'path';

export default function injectTagNameIntoSettings(repositoryPath, tagName) {
  const deploymentTarget = process.env.DEPLOYMENT_TARGET;
  const settingsFile = path.join(repositoryPath, 'config', deploymentTarget, 'settings.json');
  const settingsFileContents = fs.readFileSync(settingsFile);
  const settingsFileJson = JSON.parse(settingsFileContents);

  let publicNode = settingsFileJson.public;
  if (!publicNode) publicNode = {};
  publicNode.tagName = tagName;

  settingsFileJson.public = publicNode;
  fs.writeFileSync(settingsFile, JSON.stringify(settingsFileJson));
}
