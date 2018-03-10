#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

dest=$METEOR_PACKAGE_DIRS/pathable-collections/migrations/reset

mongorestore $dest
