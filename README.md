# Pathable-CLI

[Pathable-CLI for development](./docs/pathable-cli-development.md)
[Pathable-CLI for deployment](./docs/pathable-cli-deployment.md)

# Pathable-Scripts

## Scripts

Include this package to have access to scripts for installing, starting and deploying Pathable
applications.

Scripts included in `node_modules/.bin` are:

1. p-start
2. p-install
3. p-for

## Configuration

Env VARS will first be loaded from `~/.pathable-env`. Then from `config/<environment>/.env` in the
current directory.
