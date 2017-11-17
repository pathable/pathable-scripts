#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

which=$1
if [ "${which}" = "migration" ]; then
  ./node_modules/pathable-scripts/node_modules/.bin/babel-node ./node_modules/pathable-scripts/src/generators/migrations/generate migration "$2"
elif [ "${which}" = "widget" ]; then
  ./node_modules/.bin/plop "$@"
fi
