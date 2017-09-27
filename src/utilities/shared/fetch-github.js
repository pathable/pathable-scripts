import btoa from 'btoa';
import fetch from 'node-fetch';

export default function curlGithub(url, options = {}) {
  const userName = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  const authString = btoa(`${userName}:${token}`);
  const combinedOptions = Object.assign({}, options, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authString}`,
    },
  });

  return fetch(url, combinedOptions).then(res => res.json());
}
