# Pathable-Scripts

## Scripts

Include this package to have access to scripts for installing, starting and deploying Pathable applications.

Scripts included in `node_modules/.bin` are:

1. p-start
2. p-install
3. p-deploy
4. p-for

## Configuration

Env VARS will first be loaded from `~/.pathable-env`. Then from `config/<environment>/.env` in the current directory.

# Pathable-CLI

In order to perform deployment, you need to be logged into your meteor account on your computer.
The utility will check the login status at startup and exit if you are not logged in. Use
`meteor login` to login to your account.

## Github Integration

1. Create a personal access token in your github account.
2. Add the generated token to ~/.pathable-env file as 'GITHUB_TOKEN'.
3. Add your github username to ~/.pathable-env file as 'GITHUB_USERNAME'.

## Build & Run

1. Install dependencies for this CLI utility using `npm install`.
2. Build the utility using `npm run build`.

## Create Tag for Staging Deployment

npm run create-staging-tags
This creates a tag on all repositories which we can then use in the next step for deployment.

## Deployment to Staging

npm run deploy-to-staging
This allows us to select a tag for deployment to staging. 
We can also select which of the apps we want to deploy, and whether we want to run
unit tests for the selected apps and packages.

If you choose to run the unit tests for the apps/packages, the utility first checks the build
status of the selected tag with github. If the build status for the tag is set to 'success', then
it skips running the unit tests for it locally.

## Deployment to Production

## Link Galaxy Container to the deployment tag

During deployment, the utility adds a property named 'tagName' to the public section of the
settings.json file, with value set to the name of the tag that was used to build the app.
This allows us to look at the settings of a server on the Galaxy Dashboard and determine the
name of the "tag" that was used to build it. 

## In case of errors...

Check the logs folder for logs file. The utility creates multiple logs file pertaining to each step
of each repository. So for instance, when running `npm install` on `pathable-admin`, it would
generate a log file by the name `pathable-admin-npm-install.log`.
