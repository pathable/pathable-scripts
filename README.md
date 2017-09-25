# pathable-scripts

## Scripts

Include this package to have access to scripts for installing, starting and deploying Pathable applications.

Scripts included in `node_modules/.bin` are:

1. p-start
2. p-install
3. p-deploy
4. p-for

## Configuration

Env VARS will first be loaded from `~/.pathable-env`. Then from `config/<environment>/.env` in the current directory.

# pathable-cli

In order to perform deployment, you need to be logged into your meteor account on your computer.
The utility will check the login status at startup and exit if you are not logged in. Use
`meteor login` to login to your account.

## Github Integration

1. Create a personal access token in your github account.
2. Add the generated token to ~/.pathable-env file as 'GITHUB_TOKEN'.
3. Add your github username to ~/.pathable-env file as 'GITHUB_USERNAME'.

## Build & Run

1. Install dependencies using `npm install`.
2. Build the utility `npm run build`.
3. Initiate deployment using `npm run cmd-deploy`.

## In case of errors...

Check the logs folder for logs file. The utility creates multiple logs file pertaining to each step
of each repository. So for instance, when running `npm install` on `pathable-admin`, it would
generate a log file by the name `npm-install-pathable-admin.log`.
