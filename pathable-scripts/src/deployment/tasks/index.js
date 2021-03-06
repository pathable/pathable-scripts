export { default as startupTasks } from './startup/startup-tasks';

export { default as checkoutTag } from './checkout-tag';
export { default as updatePackageJsons } from './update-package-jsons';
export { default as loadEnvVariables } from './load-env-variables';
export { default as runAppUnitTests } from './run-app-unit-tests';
export { default as deployToServer } from './deploy-to-server';
export { default as tagRepositories } from './tag-repositories';
export { default as removeTagFromRepositories } from './remove-tag-from-repositories';
export { default as injectTagNameIntoSettings } from './inject-tag-name-into-settings';
export { default as loadGlobalVariables } from './load-global-variables';
export { default as removeMinifier } from './remove-minifier';
export { default as mergeBranchIntoMaster } from './merge-branch-into-master';
export {
  installNpmDependenciesForRepositories,
  installNpmDependenciesForPackages,
} from './install-npm-dependencies';
