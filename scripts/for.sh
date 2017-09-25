#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

rootDir=$METEOR_PACKAGE_DIRS

USAGE="Usage: npm run for <all/apps/packages/> command"

function isAppDir {
  result=$(find "$1" -maxdepth 1 -type d -name ".meteor")
  if [[ -n $result ]]; then
    return 0
  fi
  return 1
}

function isPackageDir {
  result=$(find "$1" -maxdepth 1 -type f -name "package.js")
  if [[ -n $result ]]; then
    return 0
  fi
  return 1
}

function shouldRun {
  target="$1"
  dir="$2"

  if [[ "$(basename $d)" != pathable-* ]]
  then
    return 1
  fi

  if [ "$target" == "apps" ]; then
    if isAppDir "$dir"; then
      return 0
    else
      return 1
    fi
  fi
  if [ "$target" == "packages" ]; then
    if isPackageDir "$dir"; then
      return 0
    else
      return 1
    fi
  fi
  if [ "$target" == "all" ]; then
    if isAppDir "$dir" || isPackageDir "$dir"; then
      return 0
    else
      return 1
    fi
  fi
  echo $USAGE
  return 1
}

target="$1"
shift
command="'$*'"
currentPath=$(pwd)

for d in $rootDir*
  do
    if shouldRun $target "$d"; then
      cd "$d"
      printf "${BLUE}Running command in "$(basename $d)":\n${NC}"
      eval "'$command'" || true
    fi
  done
cd $currentPath
