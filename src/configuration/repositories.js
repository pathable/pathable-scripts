export const PackagesContainerRepositoryName = 'pathable-packages';

const Repositories = [
  {
    name: 'pathable-supervisor',
    isApp: true,
    remoteUrl: 'https://github.com/pathable/pathable-supervisor.git',
    localPath: 'pathable-supervisor',
  },
  {
    name: 'pathable-admin',
    isApp: true,
    remoteUrl: 'https://github.com/pathable/pathable-admin.git',
    localPath: 'pathable-admin',
  },
  {
    name: 'pathable-app',
    isApp: true,
    remoteUrl: 'https://github.com/pathable/pathable-app.git',
    localPath: 'pathable-app',
  },
  {
    name: 'pathable-jobs',
    isApp: true,
    remoteUrl: 'https://github.com/pathable/pathable-jobs.git',
    localPath: 'pathable-jobs',
  },
  {
    name: 'pathable-mailer',
    isApp: true,
    remoteUrl: 'https://github.com/pathable/pathable-mailer.git',
    localPath: 'pathable-mailer',
  },
  {
    name: 'pathable-packages',
    isApp: false,
    remoteUrl: 'https://github.com/pathable/pathable-packages.git',
    localPath: 'pathable-packages',
  },
];

export default Repositories;
