import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function getAdminName(featurePrefix) {
  return `${featurePrefix}-pathable-admin`;
}

function getAppName(featurePrefix) {
  return `${featurePrefix}-pathable-app`;
}

function getJobsName(featurePrefix) {
  return `${featurePrefix}-pathable-jobs`;
}

function getSettingsForApp(repositoryName, featurePrefix) {
  let settings = '';
  switch (repositoryName) {
    case 'pathable-supervisor':
      settings = JSON.stringify({
        public: {
          appHost: `${getAppName(featurePrefix)}.herokuapp.com`,
          adminHost: `${getAdminName(featurePrefix)}.herokuapp.com`,
          filepickerKey: 'ARv6lIAZ0QNi4ldM9AEXwz',
          jobsAppUrl: `https://${getJobsName(featurePrefix)}.herokuapp.com`,
        },
        security: {
          account: {
            username: 'admin',
            password: 'AllCowsEatGrass',
          },
        },
      });
      break;

    case 'pathable-admin':
      settings = JSON.stringify({
        public: {
          appHost: `${getAppName(featurePrefix)}.herokuapp.com`,
          adminHost: `${getAdminName(featurePrefix)}.herokuapp.com`,
          filepickerKey: 'ARv6lIAZ0QNi4ldM9AEXwz',
          jobsAppUrl: `https://${getJobsName(featurePrefix)}.herokuapp.com`,
        },
      });
      break;

    case 'pathable-app':
      settings = JSON.stringify({
        public: {
          appHost: `${getAppName(featurePrefix)}.herokuapp.com`,
          adminHost: `${getAdminName(featurePrefix)}.herokuapp.com`,
          filepickerKey: 'ARv6lIAZ0QNi4ldM9AEXwz',
          jobsAppUrl: `https://${getJobsName(featurePrefix)}.herokuapp.com`,
        },
      });
      break;

    case 'pathable-jobs':
      settings = JSON.stringify({
        public: {},
      });
      break;

    case 'pathable-mailer':
      settings = JSON.stringify({
        public: {
          appHost: `${getAppName(featurePrefix)}.herokuapp.com`,
          adminHost: `${getAdminName(featurePrefix)}.herokuapp.com`,
          emailDefaults: {
            from: 'info@pathable.com',
          },
        },
      });
      break;

    default:
      break;
  }

  return settings;
}

export default function generateSettingsJson(appRepositories, featurePrefix) {
  console.log(chalk.yellow('Generating settings.json files in the root of app bundles.'));
  const deploymentRoot = process.env.DEPLOYMENT_ROOT;

  appRepositories.forEach((repository) => {
    const settings = getSettingsForApp(repository.name, featurePrefix);
    const settingsJsonFile = path.join(deploymentRoot, repository.name, 'bundle', 'settings.json');
    fs.writeFileSync(settingsJsonFile, settings);
  });
}
