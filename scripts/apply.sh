#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

./node_modules/pathable-scripts/node_modules/.bin/babel-node ./node_modules/pathable-scripts/src/generators/migrations/apply "$@"
