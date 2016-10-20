#!/bin/bash -e

# Load env variables for development
function load_env {
  while read -r line
  do
    export $line
  done < "$1"
}
