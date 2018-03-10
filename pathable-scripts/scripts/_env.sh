#!/bin/bash -e

# Load env variables for development
function load_env {
  if [[ -f $1 ]] ; then
    while read -r line
    do
      export $line
    done < "$1"
  fi
}
