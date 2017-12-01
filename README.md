# Pathable-CLI

* [Pathable-CLI for development](./docs/pathable-cli-development.md)
  * Deploy pathable-design to Heroku
  * Deploy pathable-apps to Heroku
* [Pathable-CLI for deployment](./docs/pathable-cli-deployment.md)
  * Create tag for staging deployment
  * Create tag for production deployment
  * Deploy to staging
  * Deploy to production

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
