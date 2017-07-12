#!/bin/bash -e

. "node_modules/pathable-scripts/scripts/_env.sh"

runner=${1-browser}
package=${2-}

# development and test configurations available
if [[ $runner == *"test"* ]]; then
  environment="test"
else
  environment="development"
fi

settingsFile=config/$environment/settings.json

load_env "$HOME/.pathable-env"
load_env "config/.env"
load_env "config/$environment/.env"

if [ $runner = "packages-test" ] || [ $runner = "packages-ci-test" ] && [ -z "$package" ]; then
  echo "Please, specify the package to test, and run on an app context."
  exit
fi

if ! type "redis-server" > /dev/null; then
  echo "Redis is required but it doesn't appear to be installed. Once running be sure to set REDIS_HOST and REDIS_PORT."
  exit
fi

if [ $runner = "test" ]; then
  meteor test --driver-package dispatch:mocha-browser --settings $settingsFile --port $PORT &

elif [ $runner = "ci-test" ]; then
  TEST_CLIENT=0 meteor test --driver-package dispatch:mocha --settings $settingsFile --port $PORT --once &

elif [ $runner = "app-test" ]; then
  meteor test --driver-package tmeasday:acceptance-test-driver --settings $settingsFile --port $PORT --full-app &

elif [ $runner = "int-test" ]; then
  meteor test --driver-package tmeasday:acceptance-test-driver --settings $settingsFile --port $PORT --full-app  &
  node_modules/.bin/chimp --ddp=$ROOT_URL --watch --cucumber --path=tests &

elif [ $runner = "packages-test" ]; then
  # Don't remove --release option, it is required for run CI tests properly
  meteor test-packages --driver-package dispatch:mocha-browser $package --settings $settingsFile --port $PORT --release $METEOR_RELEASE

elif [ $runner = "packages-ci-test" ]; then
  # Don't remove --release option, it is required for run CI tests properly
  TEST_CLIENT=0 meteor test-packages --once --driver-package dispatch:mocha $package --settings $settingsFile --port $PORT --release $METEOR_RELEASE

elif [ $runner = "ios" ]; then
  meteor run ios --settings $settingsFile --port $PORT --mobile-server $METEOR_MOBILE_SERVER &

elif [ $runner = "android" ]; then
  meteor run android --settings $settingsFile --port $PORT --mobile-server $METEOR_MOBILE_SERVER &

else
  meteor run --settings $settingsFile --port $PORT &

fi

# wait until done then kill anything started here
wait
trap 'kill $(jobs -p)' SIGINT SIGTERM
