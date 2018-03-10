#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"
. "node_modules/pathable-scripts/scripts/_lib.sh"

load_env "$HOME/.pathable-env"
load_env "config/$environment/.env"

which=$1
dest=$METEOR_PACKAGE_DIRS/pathable-collections/migrations/reset

mongodump --out $dest --db pathable

if [ "${which}" = "schema-only" ]; then
  find $dest -name '*bson' -type f -exec cp /dev/null  {} \;
fi
