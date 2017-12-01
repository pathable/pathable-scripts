# Pathable-CLI for Development

All the development commands run against your working development folder. They assume that your
development folder have the following structure.

* pathable-admin
* pathable-app
* pathable-design
* pathable-jobs
* pathable-mailer
* pathable-packages
* pathable-scripts
* pathable-supervisor

Basically, all your applications exist in the same folder. The commands also assume that you have
the `METEOR_PACKAGE_DIRS` named variable defined in your `~/.pathable-env` file.

## Build & Run

1. Clone this repository to the same folder as your other pathable applications.
2. Install dependencies for this CLI utility using `npm install`.
3. Build the utility using `npm run build`.

## Custom Command

`npm run custom-command`

This is similar in functionality to what `p-for` command provides. It allows running a command
against all of the repositories.

## Deploy Pathable-Design to Heroku

Apart from the `METEOR_PACKAGE_DIRS` variable in your `~/.pathable-env` file, you also need to add
the following variable.

`HEROKU_MONGO_URL=mongodb://dbUser:password@ds121696.mlab.com:21696/pathable-designer`

In order to deploy to HEROKU, you need to have the Heroku CLI installed locally on your system.
Follow the instructions at below link to install the CLI.

`https://devcenter.heroku.com/articles/heroku-cli`

Once the CLI is installed, open a terminal and type heroku login. At the prompts, use the following
credentials:-

`Email: dev@pathable.com` `Password: p@ssw0rd`

Upon successful login, you can close this terminal window.

Finally, to deploy the `pathable-design` app, use the following command from `pathable-scripts`.

`npm run deploy-design-to-heroku`

Note: This command does not get code from Github, rather it builds and deploys whatever code it
finds in the pathable-design in your development folder.

## Deploy Pathable-Apps to Heroku

Apart from the `METEOR_PACKAGE_DIRS` variable in your `~/.pathable-env` file, you also need to add a
variable pointing to the MongoDB instance that would be used by your apps. Multiple databases have
been created, one for every developer to use. Choose the one correponding to your name.

`HEROKU_MONGO_URL=mongodb://dbUser:password@ds127436.mlab.com:27436/pathable-egor`
`HEROKU_MONGO_URL=mongodb://dbUser:password@ds161584.mlab.com:61584/pathable-faisal`
`HEROKU_MONGO_URL=mongodb://dbUser:password@ds125716.mlab.com:25716/pathable-horacio`
`HEROKU_MONGO_URL=mongodb://dbUser:password@ds125126.mlab.com:25126/pathable-nacho`
`HEROKU_MONGO_URL=mongodb://dbUser:password@ds125906.mlab.com:25906/pathable-peter`
`HEROKU_MONGO_URL=mongodb://dbUser:password@ds127436.mlab.com:27436/pathable-rafael`

Create a free account on Heroku, if you don't already have one. In order to deploy to HEROKU, you
will need to have the Heroku CLI installed locally on your system. Follow the instructions at below
link to install the CLI.

`https://devcenter.heroku.com/articles/heroku-cli`

Once the CLI is installed, open a terminal and type heroku login. At the prompts, enter your account
credentials to login. Upon successful login, you can close this terminal window.

Finally, to deploy the pathable apps, use the following command from `pathable-scripts`.

`npm run deploy-apps-to-heroku`

Note: This command does not get code from Github, rather it builds and deploys whatever code it
finds in your development folder.

The command asks you for a prefix to use for deploying the applications. The scripts use this prefix
to name the applications that are created on heroku. So for instance, specifying a prefix of `test`
would result in creation of apps on heroku with the following names.

* test-pathable-supervisor.herokuapp.com
* test-pathable-admin.herokuapp.com
* test-pathable-app.herokuapp.com
* test-pathable-jobs.herokuapp.com

The prefix can be any string of your choosing, however you need to make sure that that prefix is not
being used by any other person on the team. If you specify a prefix that is already in use by you,
then the scripts would first delete the existing apps that are using that prefix, before
re-deploying the app using that prefix.

Once the apps are deployed, you can create communities using the supervisor. The url for the
supervisor would be `{prefix}-supervisor.herokuapp.com`.

Since our app deployments to Heroku are not using custom domain names, we cannot use the normal URL
scheme (community-slug before the -admin and -app URLs) to access the admin and app community pages.
In place of that, we now have a new page on the supervisor app at the URL
`{prefix}-supervisor.herokuapp.com/heroku` You can use this page to select a default community/site.
Once you have selected the default community/site, you would be able to access that community/site
on -admin/app using simply the prefix based URLs `{prefix}-admin.herokuapp.com` and
`{prefix}-app.herokuapp.com`.
