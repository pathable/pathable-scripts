#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

runner=${1-development}
target=${2-}

# development and test configurations available
if [[ $runner == *"test"* ]]; then
  environment="test"
else
  environment="development"
fi

load_env "config/.env"
load_env "config/$environment/.env"

if ! type "redis-server" > /dev/null; then
  echo "Redis is required but it doesn't appear to be installed. Once running be sure to set REDIS_HOST and REDIS_PORT."
  exit
fi

if [ $runner = "test" ]; then
  meteor test --driver-package dispatch:mocha-browser ./ --port $PORT &
elif [ $runner = "app-test" ]; then
  meteor test --full-app --driver-package tmeasday:acceptance-test-driver \
    --settings config/test/settings.json --port $PORT &
elif [ $runner = "int-test" ]; then
  meteor test --full-app --driver-package tmeasday:acceptance-test-driver \
    --settings config/test/settings.json --port $PORT &
  node_modules/.bin/chimp --ddp=$ROOT_URL --watch --cucumber --path=tests &
else
  meteor run $target --settings config/$environment/settings.json --port $PORT &
fi

# wait until done then kill anything started here
wait
trap 'kill $(jobs -p)' SIGINT SIGTERM
