#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

environment=${1-staging}

load_env "config/$environment/.env"

meteor deploy $PATHABLE_ADMIN_HOSTNAME --settings config/$environment/settings.json
