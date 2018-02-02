#!/bin/bash -e

package=${1-}

if [ -z "$package" ]; then
  echo "Please, specify the package to check lint, and run on an app context."
  exit
fi

eslint packages/$package --ext js,jsx
