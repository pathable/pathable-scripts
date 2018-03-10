import { gitGetHash } from '../git';
import { fetchGithub } from '../shared';

export default function getRemoteBuildStaus(repositoryName, repositoryPath) {
  const hash = gitGetHash(repositoryPath);
  const url = `https://api.github.com/repos/pathable/${repositoryName}/statuses/${hash}`;
  return fetchGithub(url).then(response => response[0].state);
}
