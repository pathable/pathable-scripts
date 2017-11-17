import program from 'commander';
import fs from 'fs';
import slugs from 'slugs';
import migrationTemplate from './templates/migration';
import migrationTestTemplate from './templates/migration-test';
import versionTemplate from './templates/migration-version';

const packagesDir = process.env.METEOR_PACKAGE_DIRS;
const collectionsDir = `${packagesDir}/pathable-collections`;
/* eslint-disable import/no-dynamic-require */
const {
  targetMigration,
  latestMigration: previousMigrationNumber,
} = require(`${collectionsDir}/migrations/migration-version`);

program
  .command('migration <migration-name>')
  .alias('m')
  .description('generate a migration file')
  .option('-s, --skip-tests [boolean]', 'Wheter or not create a test for the migration')
  .action((rawMigrationName, options) => {
    const migrationName = slugs(rawMigrationName.toLowerCase());
    const timestamp = Date.now();
    const fileName = `${timestamp}-${migrationName}`;
    const filePath = `${collectionsDir}/migrations/${fileName}.js`;
    const testFilePath = `${collectionsDir}/migrations/${fileName}.tests.js`;
    const migrationsFiles = [`${collectionsDir}/migrations/all.js`];
    const testMigrationFiles = [`${collectionsDir}/migrations/all-tests.js`];
    const migrationVersionPath = `${collectionsDir}/migrations/migration-version.js`;
    const skipTests = options.skipTests;

    const migrationContent = migrationTemplate
      .replace('{{timestamp}}', timestamp)
      .replace('{{migrationName}}', migrationName);

    const migrationTestContent = migrationTestTemplate
      .replace('{{migrationNumber}}', timestamp)
      .replace('{{previousMigrationNumber}}', previousMigrationNumber);

    const migrationVersionContent = versionTemplate
      .replace('{{targetMigration}}', skipTests ? timestamp : targetMigration)
      .replace('{{latestMigration}}', timestamp);

    fs.writeFile(`${filePath}`, migrationContent, (err) => {
      if (err) {
        throw new Error(err);
      }

      migrationsFiles.forEach((migrationsFile) => {
        fs.appendFile(migrationsFile, `import './${fileName}';\n`, (appendError) => {
          if (appendError) {
            throw new Error(appendError);
          }
        });
      });
      // eslint-disable-next-line no-console
      console.log(`Generated migration file: ${filePath}`);
    });

    fs.writeFile(`${migrationVersionPath}`, migrationVersionContent, (err) => {
      if (err) {
        throw new Error(err);
      }
      // eslint-disable-next-line no-console
      console.log(`Updated version file: ${migrationVersionPath}`);
    });

    if (skipTests) return;

    fs.writeFile(`${testFilePath}`, migrationTestContent, (err) => {
      if (err) {
        throw new Error(err);
      }

      testMigrationFiles.forEach((migrationsFile) => {
        fs.appendFile(migrationsFile, `import './${fileName}.tests';\n`, (appendError) => {
          if (appendError) {
            throw new Error(appendError);
          }
        });
      });
      // eslint-disable-next-line no-console
      console.log(`Generated migration test file: ${testFilePath}`);
    });
  });

program.parse(process.argv);
