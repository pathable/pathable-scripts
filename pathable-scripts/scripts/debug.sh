#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

environment="development"
settingsFile=config/$environment/settings.json

load_env "$HOME/.pathable-env"
load_env "config/.env"
load_env "config/$environment/.env"

meteor debug --settings $settingsFile --port $PORT &

# wait until done then kill anything started here
wait
trap 'kill $(jobs -p)' SIGINT SIGTERM
