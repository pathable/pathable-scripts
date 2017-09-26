#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

rootDir=$METEOR_PACKAGE_DIRS

USAGE="Usage: npm run for <all/apps/packages/> command\n"
HELP="To get a list of available command aliases: npm run for --help\n"

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
  echo -e "$USAGE"
  echo -e "$HELP"
  return 1
}

function getHelp {
  echo "$USAGE"
  echo "Available command aliases:\n"
  IFS="="
  while read -r name value
  do
    echo "${BLUE}${name} : ${NC}${value}\n"
  done < "node_modules/pathable-scripts/scripts/config/command-aliases.cfg"
}

function getAliasCommand {
  command="$1"
  IFS="="
  while read -r name value
  do
    if [ "$command" == "'$name'" ]; then
      echo "'${value}'"
      return 0
    fi
  done < "node_modules/pathable-scripts/scripts/config/command-aliases.cfg"
}

target="$1"
shift
command="'$*'"
currentPath=$(pwd)

if [ $target == "help" ] || [ $target == "commands" ]; then
  echo -e $(getHelp)
  exit
fi

aliasCommand=$(getAliasCommand "$command")
if [ -n "${aliasCommand}" ]; then
  command="$aliasCommand"
fi

for d in $rootDir*
  do
    if shouldRun $target "$d"; then
      cd "$d"
      printf "${BLUE}Running command in "$(basename $d)":\n${NC}"
      eval "'$command'" || true
    fi
  done
cd $currentPath
