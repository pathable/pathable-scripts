import program from 'commander';
import fs from 'fs';
import versionTemplate from './templates/migration-version';

const packagesDir = process.env.METEOR_PACKAGE_DIRS;
const collectionsDir = `${packagesDir}/pathable-collections`;
/* eslint-disable import/no-dynamic-require */
const { latestMigration } = require(`${collectionsDir}/migrations/migration-version`);

program
  .command('migration [migration-number]')
  .alias('a')
  .description('apply a migration for next run')
  .action((migrationNumber) => {
    const targetMigration = migrationNumber || latestMigration;
    const migrationVersionPath = `${collectionsDir}/migrations/migration-version.js`;

    const migrationVersionContent = versionTemplate
      .replace('{{targetMigration}}', targetMigration)
      .replace('{{latestMigration}}', latestMigration);

    fs.writeFile(`${migrationVersionPath}`, migrationVersionContent, (err) => {
      if (err) {
        throw new Error(err);
      }
      // eslint-disable-next-line no-console
      console.log(`Updated ${migrationVersionPath}, migration will be applied in next run`);
    });
  });

program.parse(process.argv);
