#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

environment=${1-staging}

load_env "$HOME/.pathable-env"
load_env "config/.env"
load_env "config/$environment/.env"

repositoryName=$(basename `git rev-parse --show-toplevel`)
gitRemoteOrigin=$GIT_REMOTE_ORIGIN
currentDir=${PWD##*/}
deployDir=${DEPLOY_DIR-/tmp/pathable-deploy}
deployBranch=${DEPLOY_BRANCH-master}
deployPackageDir=$deployDir/packages
deployAppDir=$deployDir/$currentDir
packageDir=$METEOR_PACKAGE_DIRS

# clear temporary build directory
if [[ ! "$deployDir" =~ ^/tmp ]]; then
  echo 'PATHABLE_DEPLOY_DIR must be scoped to /tmp';
  exit 1;
fi
rm -rf $deployDir; mkdir $deployDir

# copy application and install dependencies
cloneFromGit $gitRemoteOrigin/$repositoryName $deployBranch $deployAppDir
installNpm $deployAppDir true
updateFromGit $deployAppDir

# copy packages and install dependencies for each
while read -r line
do
  deployPackagePath=$deployPackageDir/$line

  if [[ $line == pathable-* ]]; then
    cloneFromGit $gitRemoteOrigin/$line $deployBranch $deployPackagePath
    installNpm $deployPackagePath true
    updateFromGit $deployPackagePath
  fi
done < '.meteor/packages'

METEOR_PACKAGE_DIRS=$deployPackageDir
( cd $deployAppDir ; meteor deploy $GALAXY_HOSTNAME --settings config/$environment/settings.json )
METEOR_PACKAGE_DIRS=$packageDir
