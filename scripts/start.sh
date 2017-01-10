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

settingsFile=config/$environment/settings.json

load_env "config/.env"
load_env "config/$environment/.env"

if ! type "redis-server" > /dev/null; then
  echo "Redis is required but it doesn't appear to be installed. Once running be sure to set REDIS_HOST and REDIS_PORT."
  exit
fi

if [ $runner = "test" ]; then
  meteor test --driver-package dispatch:mocha-browser --settings $settingsFile --port $PORT &

elif [ $runner = "ci-test" ]; then
  meteor test --driver-package dispatch:mocha-phantomjs --settings $settingsFile --port $PORT --once &

elif [ $runner = "app-test" ]; then
  meteor test --driver-package tmeasday:acceptance-test-driver --settings $settingsFile --port $PORT --full-app &

elif [ $runner = "int-test" ]; then
  meteor test --driver-package tmeasday:acceptance-test-driver --settings $settingsFile --port $PORT --full-app  &
  node_modules/.bin/chimp --ddp=$ROOT_URL --watch --cucumber --path=tests &

elif [ $runner = "packages-test" ]; then
  meteor test-packages --driver-package dispatch:mocha-browser ./ --settings $settingsFile --port $PORT --release $METEOR_RELEASE

elif [ $runner = "packages-ci-test" ]; then
  meteor test-packages --once --driver-package dispatch:mocha-phantomjs ./ --settings $settingsFile --port $PORT --release $METEOR_RELEASE

else
  meteor run $target --settings config/$environment/settings.json --port $PORT &

fi

# wait until done then kill anything started here
wait
trap 'kill $(jobs -p)' SIGINT SIGTERM
