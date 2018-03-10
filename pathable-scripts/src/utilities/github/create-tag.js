import { gitGetHash } from '../git';
import { fetchGithub } from '../shared';

export default function createTag(repositoryName, repositoryPath, tagName) {
  const tagMessage = 'Creating staging tag for deployment to staging';

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
    if (!response.sha) {
      throw new Error(response);
    }

    url = `https://api.github.com/repos/pathable/${repositoryName}/git/refs`;
    options = {
      method: 'POST',
      body: JSON.stringify({
        ref: `refs/tags/${tagName}`,
        sha: response.sha,
      }),
    };

    return fetchGithub(url, options).then((response2) => {
      if (!response2.ref) {
        throw new Error(response2);
      }
    });
  });
}
