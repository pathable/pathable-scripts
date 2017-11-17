'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _slugs = require('slugs');

var _slugs2 = _interopRequireDefault(_slugs);

var _migration = require('./templates/migration');

var _migration2 = _interopRequireDefault(_migration);

var _migrationTest = require('./templates/migration-test');

var _migrationTest2 = _interopRequireDefault(_migrationTest);

var _migrationVersion = require('./templates/migration-version');

var _migrationVersion2 = _interopRequireDefault(_migrationVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packagesDir = process.env.METEOR_PACKAGE_DIRS;
var collectionsDir = packagesDir + '/pathable-collections';
/* eslint-disable import/no-dynamic-require */

var _require = require(collectionsDir + '/migrations/migration-version'),
    targetMigration = _require.targetMigration,
    previousMigrationNumber = _require.latestMigration;

_commander2.default.command('migration <migration-name>').alias('m').description('generate a migration file').option('-s, --skip-tests [boolean]', 'Wheter or not create a test for the migration').action(function (rawMigrationName, options) {
  var migrationName = (0, _slugs2.default)(rawMigrationName.toLowerCase());
  var timestamp = Date.now();
  var fileName = timestamp + '-' + migrationName;
  var filePath = collectionsDir + '/migrations/' + fileName + '.js';
  var testFilePath = collectionsDir + '/migrations/' + fileName + '.tests.js';
  var migrationsFiles = [collectionsDir + '/migrations/all.js'];
  var testMigrationFiles = [collectionsDir + '/migrations/all-tests.js'];
  var migrationVersionPath = collectionsDir + '/migrations/migration-version.js';
  var skipTests = options.skipTests;

  var migrationContent = _migration2.default.replace('{{timestamp}}', timestamp).replace('{{migrationName}}', migrationName);

  var migrationTestContent = _migrationTest2.default.replace('{{migrationNumber}}', timestamp).replace('{{previousMigrationNumber}}', previousMigrationNumber);

  var migrationVersionContent = _migrationVersion2.default.replace('{{targetMigration}}', skipTests ? timestamp : targetMigration).replace('{{latestMigration}}', timestamp);

  _fs2.default.writeFile('' + filePath, migrationContent, function (err) {
    if (err) {
      throw new Error(err);
    }

    migrationsFiles.forEach(function (migrationsFile) {
      _fs2.default.appendFile(migrationsFile, 'import \'./' + fileName + '\';\n', function (appendError) {
        if (appendError) {
          throw new Error(appendError);
        }
      });
    });
    // eslint-disable-next-line no-console
    console.log('Generated migration file: ' + filePath);
  });

  _fs2.default.writeFile('' + migrationVersionPath, migrationVersionContent, function (err) {
    if (err) {
      throw new Error(err);
    }
    // eslint-disable-next-line no-console
    console.log('Updated version file: ' + migrationVersionPath);
  });

  if (skipTests) return;

  _fs2.default.writeFile('' + testFilePath, migrationTestContent, function (err) {
    if (err) {
      throw new Error(err);
    }

    testMigrationFiles.forEach(function (migrationsFile) {
      _fs2.default.appendFile(migrationsFile, 'import \'./' + fileName + '.tests\';\n', function (appendError) {
        if (appendError) {
          throw new Error(appendError);
        }
      });
    });
    // eslint-disable-next-line no-console
    console.log('Generated migration test file: ' + testFilePath);
  });
});

_commander2.default.parse(process.argv);