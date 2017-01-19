npmCommand="yarn"

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
