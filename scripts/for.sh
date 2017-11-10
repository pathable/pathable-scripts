#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

appsDir=".."
packagesDir=$METEOR_PACKAGE_DIRS

USAGE="Usage: npm run for <all/apps/packages/> command"
HELP="To get a list of available command aliases: npm run for commands"

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
  _target="$1"
  _dir="$2"

  if [[ "$(basename $d)" != pathable-* ]]
  then
    return 1
  fi

  if [ "$_target" == "apps" ]; then
    if isAppDir "$_dir"; then
      return 0
    else
      return 1
    fi
  fi
  if [ "$_target" == "packages" ]; then
    if isPackageDir "$_dir"; then
      return 0
    else
      return 1
    fi
  fi
  if [ "$_target" == "all" ]; then
    if isAppDir "$_dir" || isPackageDir "$_dir"; then
      return 0
    else
      return 1
    fi
  fi
  echo "$USAGE"
  echo "$HELP"
  return 1
}

function getHelp {
  echo "$USAGE\n"
  echo "Available command aliases:\n"
  IFS="="
  while read -r name value
  do
    echo "${BLUE}${name} : ${NC}${value}\n"
  done < "node_modules/pathable-scripts/config/command-aliases.cfg"
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
  done < "node_modules/pathable-scripts/config/command-aliases.cfg"
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

if [ "$target" == "all" ] || [ "$target" == "apps" ]; then
  for d in $appsDir/*
    do
      if shouldRun "apps" "$d"; then
        cd "$d"
        printf "${BLUE}Running command in "$(basename $d)":\n${NC}"
        eval "'$command'" || true
      fi
    done
fi

if [ "$target" == "all" ] || [ "$target" == "packages" ]; then
  for d in $packagesDir/*
    do
      if shouldRun "packages" "$d"; then
        cd "$d"
        printf "${BLUE}Running command in "$(basename $d)":\n${NC}"
        eval "'$command'" || true
      fi
    done
fi

cd $currentPath
