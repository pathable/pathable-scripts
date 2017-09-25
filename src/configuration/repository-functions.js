import { find, filter } from 'lodash';
import Repositories from './repositories';

export function getAllRepositories() {
  return Repositories;
}

export function getAppRepositories() {
  return filter(Repositories, { isApp: true });
}

export function getPackageRepositories() {
  return filter(Repositories, { isApp: false });
}

export function getRepositoryByName(repositoryName) {
  return find(Repositories, { name: repositoryName });
}

export function getRepositoriesByName(repositoryNames) {
  return filter(Repositories, repository => repositoryNames.indexOf(repository.name) !== -1);
}
