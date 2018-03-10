#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

# fix: https://github.com/meteor/meteor/issues/8157
export TOOL_NODE_FLAGS="--max-old-space-size=4096"

# Install npm modules from Meteor dependent packages. Takes two position arguments:
# 1) flag to git pull each package first, if possible
# 2) flag to first clear node_modules directory
function run {
  environment=${1-staging}
  clear=${2-false}
  reinstall=${3-false}

  load_env "$HOME/.pathable-env"
  load_env "config/.env"
  load_env "config/$environment/.env"

  echo "Deploying from $DEPLOY_BRANCH to environment $environment..."

  repositoryName=$(basename `git rev-parse --show-toplevel`)
  gitRemoteOrigin=$GIT_REMOTE_ORIGIN
  currentDir=${PWD##*/}
  deployDir=${DEPLOY_DIR-/tmp/pathable-deploy}
  deployBranch=${DEPLOY_BRANCH-master}
  deployPackageDir=$deployDir/packages
  deployAppDir=$deployDir/$currentDir
  packageDir=$METEOR_PACKAGE_DIRS

  if [ "$clear" = true ] ; then
    rm -rf $deployDir; mkdir $deployDir
    cloneFromGit $gitRemoteOrigin/$repositoryName $deployBranch $deployAppDir
  else
    updateFromGit $deployAppDir
  fi

  # copy application and install dependencies
  installNpm $deployAppDir $reinstall
  updateFromGit $deployAppDir

  # copy packages and install dependencies for each
  while read -r line
  do
    deployPackagePath=$deployPackageDir/$line

    if [[ $line == pathable-* ]]; then
      if [ "$clear" = true ] ; then
        cloneFromGit $gitRemoteOrigin/$line $deployBranch $deployPackagePath
      else
        updateFromGit $deployPackagePath
      fi
      installNpm $deployPackagePath $reinstall
      updateFromGit $deployPackagePath
    fi
  done < '.meteor/packages'

  METEOR_PACKAGE_DIRS=$deployPackageDir
  ( cd $deployAppDir ; meteor deploy $GALAXY_HOSTNAME --settings config/$environment/settings.json )
  METEOR_PACKAGE_DIRS=$packageDir
}

function usage { echo "Usage: $0 [-c(lear) -r(einstall)]" 1>&2; exit 1; }

environment=${1-staging}
shift 1

while getopts ":rc" opt; do
  case $opt in
    r)
      reinstall=true
      ;;
    c)
      clear=true
      ;;
    *)
      usage
      ;;
  esac
done
shift $((OPTIND-1))

if [ $environment = "staging" ] || [ $environment = "production" ]; then
  run $environment $clear $reinstall
else
  echo "Not a valid environment" &
fi
