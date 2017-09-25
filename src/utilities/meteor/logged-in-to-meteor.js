import { execSync } from 'child_process';

export default function loggedInToMeteor() {
  const command = 'meteor whoami';
  const buffer = execSync(command);
  const status = buffer.toString().trim();

  if (status.indexOf('Not logged in.') === -1) return true;
  return false;
}
