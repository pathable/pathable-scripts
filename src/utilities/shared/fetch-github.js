import btoa from 'btoa';
import fetch from 'node-fetch';

export default function curlGithub(url) {
  const userName = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  const authString = btoa(`${userName}:${token}`);
  return fetch(url, {
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Basic ${authString}`,
    },
  }).then(res => res.json());
}
