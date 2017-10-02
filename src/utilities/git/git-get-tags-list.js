import { execSync } from 'child_process';

export default function gitGetTagsList(repositoryPath, filterString) {
  const command = 'git tag -l';
  const options = {
    cwd: repositoryPath,
  };

  const buffer = execSync(command, options);
  const tagNamesString = buffer.toString().trim();
  const tagNames = tagNamesString.split(/\r\n|\r|\n/g);
  let filteredTagNames = tagNames.filter(tagName => tagName.startsWith(filterString));
  if (filteredTagNames.length > 5) {
    filteredTagNames = filteredTagNames.slice(0, 5);
  }

  return filteredTagNames;
}
