#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

environment=${1-staging}

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

currentBranch=$(git rev-parse --abbrev-ref HEAD)
currentDir=${PWD##*/}
deployDir=${DEPLOY_DIR-/tmp/pathable-deploy}
deployBranch=${DEPLOY_BRANCH-master}
deployPackageDir=$deployDir/packages
deployAppDir=$deployDir/$currentDir
packageDir=$METEOR_PACKAGE_DIRS

# Clone git repo from one directory into another. Takes three position arguments:
# 1) directory with existing git repo
# 2) directory to which clone should be made
function gitCloneFromDir {
  fromDir=$1
  toDir=$2
  git clone --branch $deployBranch $fromDir $toDir
}

# clear temporary build directory
if [[ ! "$deployDir" =~ ^/tmp ]]; then
  echo 'PATHABLE_DEPLOY_DIR must be scoped to /tmp';
  exit 1;
fi
rm -rf $deployDir; mkdir $deployDir

# copy application and install dependencies
gitCloneFromDir . $deployAppDir
installNpm $deployAppDir true
updateFromGit $deployAppDir

# copy packages and install dependencies for each
while read -r line
do
  packagePath=$packageDir/$line
  deployPackagePath=$deployPackageDir/$line

  if [[ $line == pathable-* ]]; then
    gitCloneFromDir $packagePath $deployPackagePath
    installNpm $deployPackagePath true
    updateFromGit $deployPackagePath
  fi
done < '.meteor/packages'

METEOR_PACKAGE_DIRS=$deployPackageDir
( cd $deployAppDir ; meteor deploy $GALAXY_HOSTNAME --settings config/$environment/settings.json )
METEOR_PACKAGE_DIRS=$packageDir
