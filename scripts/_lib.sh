#!/bin/bash -e

npmCommand="meteor npm"
npmAddCommand="meteor npm install"

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

function initialize {
  path=${1-.}

  # Install yarn to Meteor globals. Enable `meteor yarn` subcommand.
  if [ ! $(meteor npm list -gs --depth=0 | grep -o "yarn") ]; then
    printf "${BLUE}Installing yarn to Meteor globals...\n${NC}"
    meteor npm install -g yarn --ignore-scripts
  fi

  # Establish npm command
  if meteor yarn info -s | grep -qo "yarn info"; then
    npmCommand="meteor yarn"
    npmAddCommand="meteor yarn add"
  fi

  printf "${BLUE}Command established: %s\n${NC}" "${npmCommand}"
}

# Install npm modules. Takes two positional arguments:
# 1) path where package.json file is located
# 2) reinstall flag to first clear node_modules directory
# 2) ignore flag to not run the hook scripts on execute the install
function installNpm {
  path=${1-.}
  reinstall=${2-false}
  ignoreScripts=${3-false}

  cd $path

  if [ "$reinstall" = true ] && [ -d "./node_modules" ]; then
    # enable to iterate over hidden files/folders
    shopt -s dotglob
    for f in node_modules/*; do
      if [ $f != 'node_modules/pathable-scripts' ] && [ $f != 'node_modules/.bin' ]; then
        rm -rf $f
      fi
    done
  fi

  printf "${BLUE}Installing npm modules from: %s\n${NC}" "${path##*/}"
  if [ "$ignoreScripts" = true ]; then
    $npmCommand install --ignore-scripts
  else
    $npmCommand install
  fi

  cd $OLDPWD
}

# Is the context a Meteor app?
function isApp {
  [ -f ".meteor/packages" ]
}

# Is the context a Meteor app?
function isPackage {
  [ -f "package.js" ]
}

function existsLocalBranch {
  branch_name=${1-}
  existsLocally=$(git branch | grep "\b$branch_name$")
  [ "$existsLocally" ]
}

function existsRemoteBranch {
  branch_name=${1-}
  existsRemotely=$(git branch -r | grep "\borigin/$branch_name$")
  [ "$existsRemotely" ]
}

# Does the branch exist in the current git context?
function existsBranch {
  branch_name=${1-}
  $(existsLocalBranch $branch_name) || $(existsRemoteBranch $branch_name)
}

# Get the ancestor branch
function ancestorBranch {
  current_branch=${1-}
  echo $(git show-branch -a | grep '\*' | grep -v "$current_branch" | head -n1 |  sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//')
}

# Which is the current ancestor context branch?
function currentAncestorBranch {
  current_branch=${1-}
  if [ $current_branch == "development" ] || [ $current_branch == "master" ]; then
    echo $current_branch
  elif echo $current_branch | grep -q -e "feature" -e "release"; then
    echo "development"
  elif echo $current_branch | grep -q "hotfix"; then
    echo "master"
  else
    ancestor=$(ancestorBranch $current_branch)
    while [ $ancestor != "development" ] && [ $ancestor != "master" ]; do
      if existsBranch $ancestor; then
        ancestor="$(ancestorBranch $ancestor)"
      elif existsBranch "development"; then
        ancestor="development"
      else
        ancestor="master"
      fi
    done
    echo $ancestor
  fi
}

# Pull latest from current branch. Takes one position argument:
# 1) directory which should be git updated
function updateFromGit {
  gitBranch=`git rev-parse --abbrev-ref HEAD`
  gitDir=${1-.}

  printf "${BLUE}Updating from git: %s\n${NC}" "${gitDir##*/}"
  git -C $gitDir pull
}

# Clone git repo from one directory into another. Takes three position arguments:
# 1) remote origin URL from which to clone
# 2) directory to which clone should be made
function cloneFromGit {
  fromRemoteOrigin=$1
  branch=$2
  toDir=$3
  git clone $fromRemoteOrigin --branch $branch --single-branch $toDir
}
