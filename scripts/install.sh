#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"

BLUE='\033[0;34m'
NC='\033[0m'
packageDir=$METEOR_PACKAGE_DIRS
pull=false
reinstall=false
clearPackages=false

# Pull latest from current branch. Takes one position argument:
# 1) directory which should be git updated
function updateFromGit {
  gitBranch=`git rev-parse --abbrev-ref HEAD`
  gitDir=${1-.}

  printf "${BLUE}Updating from git: %s\n${NC}" "${gitDir##*/}"
  git -C $gitDir pull
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
        if [ "$clearPackages" = true ] ; then
          echo "Removing contents of folder $packageLocalPath"
          rm -rf $packageLocalPath
          mkdir $packageLocalPath
        else
          >&2 echo "$(tput setaf 1) You have a package installed in the $packageLocalPath directory. You may instead want to set PACKAGES_DIR and manage packages via git instead.$(tput setab 7)"
        fi
      fi

      if [ "$pull" = true ] && [ -d "$packagePath/.git" ]; then
        updateFromGit $packagePath
      fi

      if [ -f "$packagePath/package.json" ]; then
        installNpm $packagePath $reinstall
      fi
    fi
  done < '.meteor/packages'
}

function usage { echo "Usage: $0 [-p(ull) -r(einstall) -c(lear)]" 1>&2; exit 1; }

# parse optional parameters
while getopts ":prc" opt; do
  case $opt in
    p)
      pull=true
      ;;
    r)
      reinstall=true
      ;;
    c)
      clearPackages=true
      ;;
    *)
      usage
      ;;
  esac
done
shift $((OPTIND-1))

# do run run, do run run
run $pull $reinstall
