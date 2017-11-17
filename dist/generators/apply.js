'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _migrationVersion = require('./templates/migration-version');

var _migrationVersion2 = _interopRequireDefault(_migrationVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packagesDir = process.env.METEOR_PACKAGE_DIRS;
var collectionsDir = packagesDir + '/pathable-collections';
/* eslint-disable import/no-dynamic-require */

var _require = require(collectionsDir + '/migrations/migration-version'),
    latestMigration = _require.latestMigration;

_commander2.default.command('migration [migration-number]').alias('a').description('apply a migration for next run').action(function (migrationNumber) {
  var targetMigration = migrationNumber || latestMigration;
  var migrationVersionPath = collectionsDir + '/migrations/migration-version.js';

  var migrationVersionContent = _migrationVersion2.default.replace('{{targetMigration}}', targetMigration).replace('{{latestMigration}}', latestMigration);

  _fs2.default.writeFile('' + migrationVersionPath, migrationVersionContent, function (err) {
    if (err) {
      throw new Error(err);
    }
    // eslint-disable-next-line no-console
    console.log('Updated ' + migrationVersionPath + ', migration will be applied in next run');
  });
});

_commander2.default.parse(process.argv);