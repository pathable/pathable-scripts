import { execSync } from 'child_process';
import { map } from 'lodash';

export default function gitGetBranchNames(repositoryPath) {
  const command = 'git branch -r';
  const options = {
    cwd: repositoryPath,
  };

  const buffer = execSync(command, options);
  const branchNamesString = buffer.toString().trim();
  const branchNames = branchNamesString.split(/\r\n|\r|\n/g);

  const trimmedBranchNames = map(branchNames, branchName => branchName.trim());
  const remoteBranchNames = trimmedBranchNames.filter(branchName =>
    branchName.startsWith('origin/'),
  );

  const formattedBranchNames = map(remoteBranchNames, branchName =>
    branchName.replace('origin/', ''),
  );

  return formattedBranchNames;
}
