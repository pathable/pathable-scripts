# Pathable-CLI for Deployment

All the deployment commands create a deploy folder within the pathable-scripts folder where they
clone all the source code repositories for performing actions on them e.g. creating tags, merging
branches, building and deploying. This enables running deploy commands without disturbing your
development working folder.

In order to perform deployment, you need to be logged into your meteor account on your computer. The
utility will check the login status at startup and exit if you are not logged in. Use `meteor login`
to login to your account.

## Build & Run

1. Clone this repository to the same folder as your other pathable applications.
2. Install dependencies for this CLI utility using `npm install`.
3. Build the utility using `npm run build`.

## Github Integration

1. Create a personal access token in your github account.
2. Add the generated token to ~/.pathable-env file as 'GITHUB_TOKEN'.
3. Add your github username to ~/.pathable-env file as 'GITHUB_USERNAME'.

## Create Tag for Staging Deployment

`npm run create-staging-tags`

This creates a tag on all repositories which we can then use in the next step for deployment. The
default naming convention suggested by the utility is of the format staging-{YYMMDD}-{HHmm}.
'YYMMDD' is year, month and date. 'HHmm' is hours and minutes. The latter has just been added in
case we have to make multiple deployments in a single day.

## Deployment to Staging

`npm run deploy-to-staging`

This allows us to select a tag for deployment to staging. We can also select which of the apps we
want to deploy, and whether we want to run unit tests for the selected apps and packages.

If you choose to run the unit tests for the apps/packages, the utility first checks the build status
of the selected tag with github. If the build status for the tag is set to 'success', then it skips
running the unit tests for it locally.

## Create Tag for Production Deployment

`npm run create-production-tags`

This creates a tag on all repositories which we can then use in the next step for deployment. The
default naming convention suggested by the utility is of the format production-{YYMMDD}-{HHmm}.
'YYMMDD' is year, month and date. 'HHmm' is hours and minutes. The latter has just been added in
case we have to make multiple deployments in a single day.

It also gives you an opportunity to merge any branch into the master branch, before creating the
tag. In case the code that needs to be deployed has already been merged into master, you can skip
this. If you do provide a branch name, the utility will get the lastest code from that branch, merge
it into master branch, commit and push the changes back to the server, before creating the tag.

## Deployment to Production

`npm run deploy-to-production`

This allows us to select a tag for deployment to production. We can also select which of the apps we
want to deploy, and whether we want to run unit tests for the selected apps and packages.

If you choose to run the unit tests for the apps/packages, the utility first checks the build status
of the selected tag with github. If the build status for the tag is set to 'success', then it skips
running the unit tests for it locally.

## Parallel Deployments

Running the unit tests and deploying the apps to Galaxy are both long running tasks that take up
significant amount of memory and processing power. By default, both of these are run in serial for
all the apps. However, if the system has enough RAM to spare, these can be set to run in parallel by
answering 'y' to the relevant propmt at startup.

## Linking Galaxy Container to the Deployment Tag

During deployment, the utility adds a property named 'tagName' to the public section of the
settings.json file, with value set to the name of the tag that was used to build the app. This
allows us to look at the settings of a server on the Galaxy Dashboard and determine the name of the
"tag" that was used to build it.

## In case of errors...

For tasks that are run synchronously, the error output is directly logged to the console. For some
of the long running tasks (like 'npm install'), we spawn child processes to run them. These tasks do
not print their outout to our terminal. Instead they create log files with in the 'logs' folder.
Multiple log files pertaining to each of these child processes are created.. So for instance, when
running `npm install` on `pathable-admin`, it would generate a log file by the name
`pathable-admin-npm-install.log`.
