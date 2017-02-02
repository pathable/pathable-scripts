npmCommand="npm"
npmAddCommand="npm install"

BLUE='\033[0;34m'
NC='\033[0m'


function initialize {
  path=${1-.}

  # Install yarn to Meteor globals. Enable `meteor yarn` subcommand.
  if [ ! $(meteor npm list -gs --depth=0 | grep -o "yarn") ]; then
    printf "${BLUE}Installing yarn to Meteor globals...\n${NC}"
    meteor npm install -g yarn --ignore-scripts
  fi

  # Establish npm command
  if meteor yarn info -s | grep -qo "yarn info"; then
    npmCommand="meteor yarn"
    npmAddCommand="meteor yarn add"
  elif yarn info | grep -qo "yarn info"; then
    npmCommand="yarn"
    npmAddCommand="yarn add"
  fi

  printf "${BLUE}Command established: %s\n${NC}" "${npmCommand}"
}

# Install npm modules. Takes two positional arguments:
# 1) path where package.json file is located
# 2) reinstall flag to first clear node_modules directory
# 2) ignore flag to not run the hook scripts on execute the install
function installNpm {
  path=${1-.}
  reinstall=${2-false}
  ignoreScripts=${3-false}

  cd $path

  if [ "$reinstall" = true ] && [ -d "./node_modules" ]; then
    # enable to iterate over hidden files/folders
    shopt -s dotglob
    for f in node_modules/*; do
      if [ $f != 'node_modules/pathable-scripts' ] && [ $f != 'node_modules/.bin' ]; then
        rm -rf $f
      fi
    done
  fi

  printf "${BLUE}Installing npm modules from: %s\n${NC}" "${path##*/}"
  if [ "$ignoreScripts" = true ]; then
    $npmCommand install --ignore-scripts
  else
    $npmCommand install
  fi

  cd $OLDPWD
}
