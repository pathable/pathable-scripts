#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

packageDir=$METEOR_PACKAGE_DIRS

currentPath=$PWD
currentDir=${PWD##*/}

function prepare {
  package=${1-}
  pull=${2-}
  git fetch
  branch=$(getBranch)
  printf "${BLUE}Preparing \""${package}\"" to \"${branch}\"...\n${NC}"
  git checkout $branch
  if [ "$pull" = true ]; then
    if existsRemoteBranch $branch; then
      if git status -uno | grep -qo "nothing to commit"; then
        git branch --set-upstream-to=origin/$branch $branch
        git pull
      fi
    fi
  fi
}

function prepareDependencies {
  package=${1-}
  pull=${2-}
  packagePath=$packageDir/$package
  if [ ! -d "$packagePath" ]; then
    branch=$(getBranch)
    git clone https://github.com/pathable/$package.git $packagePath
  fi
  cd $packagePath
  prepare $package $pull
  cd $currentPath
}

# Prepare app packages from a Meteor app
function prepareAppDependencies {
  pull=${1-}
  while read -r line
  do
    package=$(echo ${line} | sed -n 's/\(pathable-*\)/\1/p')
    if [ ! -z "$package" ]; then
      prepareDependencies $package $pull
    fi
  done < '.meteor/packages'
}

# Prepare app packages from a Meteor app
function preparePackageDependencies {
  pull=${1-}
  cat 'package.js' | grep "api.use([\'\"]pathable-\w*[\'\"]);" | sort | uniq | while read -r line
  do
    package=$(sed -n "s/^api.use([\'\"]\(pathable\-.*\)[\'\"]);$/\1/p" <<< "${line}")
    if [ ! -z "$package" ]; then
      prepareDependencies $package $pull
    fi
  done
}

function usage { echo "Usage: $0 [-p(ull)]" 1>&2; exit 1; }

# parse optional parameters
while getopts ":prc" opt; do
  case $opt in
    p)
      pull=true
      ;;
    *)
      usage
      ;;
  esac
done
shift $((OPTIND-1))

checkoutBranch=${1-$(git rev-parse --abbrev-ref HEAD)}
fallbackBranch=${2-$(currentAncestorBranch $checkoutBranch)}

# Get the branch to check out
function getBranch {
  branch=''
  if existsBranch $checkoutBranch; then
    branch=$checkoutBranch
  else
    if existsBranch $fallbackBranch; then
      branch=$fallbackBranch
    else
      branch="master"
    fi
  fi
  echo $branch
}

printf "${BLUE}branch: ${checkoutBranch}\n${NC}"
printf "${BLUE}fallback: ${fallbackBranch}\n${NC}"
printf "\n"

prepare $currentDir $pull
if isApp; then
  prepareAppDependencies $pull
elif isPackage; then
  preparePackageDependencies $pull
fi
