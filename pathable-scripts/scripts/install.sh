#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/.env"
load_env "config/$environment/.env"

packageDir=$METEOR_PACKAGE_DIRS
pull=false
reinstall=false
clearPackages=false
fullInstall=false

# Install npm modules from Meteor dependent packages. Takes two position arguments:
# 1) flag to git pull each package first, if possible
# 2) flag to first clear node_modules directory
function run {
  pull=${1-false}
  reinstall=${2-false}

  initialize .

  if [ "$pull" = true ] ; then
    updateFromGit .
  fi

  ignoreScripts=true
  installNpm . $reinstall $ignoreScripts

  if [ "$fullInstall" = true ] ; then
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
            >&2 echo "$(tput setaf 1) You have a package installed in the $packageLocalPath directory. You may instead want to set METEOR_PACKAGES_DIR and manage packages via git instead.$(tput setab 7)"
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
  fi
}

function usage { echo "Usage: $0 [-p(ull) -r(einstall) -c(lear)]" 1>&2; exit 1; }

# parse optional parameters
while getopts ":prc" opt; do
  case $opt in
    p)
      pull=true
      fullInstall=true
      ;;
    r)
      reinstall=true
      fullInstall=true
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
