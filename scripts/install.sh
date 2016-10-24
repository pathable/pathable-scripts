#!/bin/bash -e

BLUE='\033[0;34m'
NC='\033[0m'
packageDir=$PACKAGE_DIRS
pull=false
reinstall=false
enforceMaster=true
defaultGitBranch="master"
npmCommand="meteor npm"

# Install npm modules. Takes two positional arguments:
# 1) path where package.json file is located
# 2) reinstall flag to first clear node_modules directory
function installNpm {
  path=${1-.}
  reinstall=${2-false}

  if [ "$reinstall" = true ]; then
    rm -rf "$path/node_modules"
  fi

  printf "${BLUE}Installing npm modules from: %s\n${NC}" "${path##*/}"
  $npmCommand install --prefix $path --ignore-scripts
}

# Pull latest from current branch. Takes one position argument:
# 1) directory which should be git updated
function updateFromGit {
  gitBranch=`git rev-parse --abbrev-ref HEAD`
  gitDir=${1-.}

  if [ "$enforceMaster" = true ] && [ $gitBranch != $defaultGitBranch ]; then
    echo "$gitDir is not on branch \"$defaultGitBranch\" (it is on $gitBranch)"
    exit
  fi

  printf "${BLUE}Updating from git: %s\n${NC}" "${gitDir##*/}"
  git -C $gitDir pull
}

# Install npm modules that need to be installed via meteor
function installMeteorNpm {
  meteor npm install unicode bcrypt
}

# Install npm modules from Meteor dependent packages. Takes two position arguments:
# 1) flag to git pull each package first, if possible
# 2) flag to first clear node_modules directory
function run {
  pull=${1-false}
  reinstall=${2-false}

  if [ "$pull" = true ] ; then
    updateFromGit .
  fi

  installNpm . $reinstall

  while read -r line
  do
    packagePath=$packageDir/$line
    packageLocalPath=packages/$line

    if [ ! -z "$line" ] && [ -d "$packagePath" ]; then

      if [ "$(ls -A $packageLocalPath)" ]; then
        >&2 echo "$(tput setaf 1) You have a package installed in the ./package directory. You may instead want to set PACKAGES_DIR and manage packages via git instead.$(tput setab 7)"
      fi

      if [ "$pull" = true ] && [ -d "$packagePath/.git" ]; then
        updateFromGit $packagePath
      fi

      if [ -f "$packagePath/package.json" ]; then
        installNpm $packagePath $reinstall
      fi
    fi
  done < '.meteor/packages'

  installMeteorNpm
}

function usage { echo "Usage: $0 [-p(ull) -r(einstall)]" 1>&2; exit 1; }

# parse optional parameters
while getopts ":pr" opt; do
  case $opt in
    p)
      pull=true
      ;;
    r)
      reinstall=true
      ;;
    *)
      usage
      ;;
  esac
done
shift $((OPTIND-1))

# do run run, do run run
run $pull $reinstall
