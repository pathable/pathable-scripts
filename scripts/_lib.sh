npmCommand="npm"
babelCliVersion="^6.18.0"

function initialize {
  path=${1-.}

  # Install yarn to Meteor globals. Enable `meteor yarn` subcommand.
  if [ ! $(meteor npm list -gs --depth=0 | grep -qo "yarn") ]; then
    printf "${BLUE}Installing yarn to Meteor globals...\n${NC}"
    meteor npm install yarn -g
  fi

  # Install babel-cli for running ES6 scripts
  if [ ! -d "$path/node_modules/babel-cli" ]; then
    printf "${BLUE}Installing babel-cli...\n${NC}"
    npm install babel-cli@$babelCliVersion --save-dev
  fi

  # Establish npm command
  if meteor yarn info -s | grep -qo "yarn info"; then
    npmCommand="meteor yarn"
  elif yarn info | grep -qo "yarn info"; then
    npmCommand="yarn"
  fi

  printf "${BLUE}Command established: %s\n${NC}" "${npmCommand}"
}

# Install npm modules. Takes two positional arguments:
# 1) path where package.json file is located
# 2) reinstall flag to first clear node_modules directory
function installNpm {
  path=${1-.}
  reinstall=${2-false}

  cd $path

  if [ "$reinstall" = true ]; then
    rm -rf node_modules
  fi

  printf "${BLUE}Installing npm modules from: %s\n${NC}" "${path##*/}"
  $npmCommand install

  cd $OLDPWD
}
