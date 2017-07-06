#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

environment="development"
settingsFile=config/$environment/settings.json

load_env "$HOME/.pathable-env"
load_env "config/.env"
load_env "config/$environment/.env"

if ! type "redis-server" > /dev/null; then
  echo "Redis is required but it doesn't appear to be installed. Once running be sure to set REDIS_HOST and REDIS_PORT."
  exit
fi

meteor debug --settings $settingsFile --port $PORT &

# wait until done then kill anything started here
wait
trap 'kill $(jobs -p)' SIGINT SIGTERM
