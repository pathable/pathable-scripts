#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

environment=${1-staging}

load_env "config/$environment/.env"

meteor deploy $GALAXY_HOSTNAME --settings config/$environment/settings.json
