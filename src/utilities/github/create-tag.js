import { gitGetHash } from '../git';
import { fetchGithub } from '../shared';

export default function createTag(repositoryName, repositoryPath) {
  const tagName = process.env.TAG_NAME;
  const tagMessage = process.env.TAG_MESSAGE;

  const hash = gitGetHash(repositoryPath);
  let url = `https://api.github.com/repos/pathable/${repositoryName}/git/tags`;
  let options = {
    method: 'POST',
    body: JSON.stringify({
      tag: tagName,
      message: tagMessage,
      object: hash,
      type: 'commit',
      tagger: {
        name: 'Faisal Ahmad',
        email: 'faisal@pathable.com',
        date: new Date(),
      },
    }),
  };

  return fetchGithub(url, options).then((response) => {
    url = `https://api.github.com/repos/pathable/${repositoryName}/git/refs`;
    options = {
      method: 'POST',
      body: JSON.stringify({
        ref: `refs/tags/${tagName}`,
        sha: response.sha,
      }),
    };

    return fetchGithub(url, options);
  });
}
