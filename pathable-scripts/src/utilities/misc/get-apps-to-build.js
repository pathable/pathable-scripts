/**
 * Based on the user inputs build an array of the names of the apps that we need to build.
 * @param {*} inputs
 */
export default function getAppsToBuild(inputs) {
  const appsToBuild = [];
  if (inputs.deploySupervisor === 'y') appsToBuild.push('pathable-supervisor');
  if (inputs.deployAdmin === 'y') appsToBuild.push('pathable-admin');
  if (inputs.deployApp === 'y') appsToBuild.push('pathable-app');
  if (inputs.deployJobs === 'y') appsToBuild.push('pathable-jobs');
  if (inputs.deployMailer === 'y') appsToBuild.push('pathable-mailer');

  return appsToBuild;
}
