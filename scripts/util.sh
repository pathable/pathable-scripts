#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

command=$1

case "$1" in
  git-prune)
    node_modules/pathable-scripts/scripts/util/prune.sh
    ;;
  *)
    echo $"Available utils: {git-prune}"
    exit 1
esac
