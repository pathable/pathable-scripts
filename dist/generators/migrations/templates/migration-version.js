"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n/**\n * DO NOT USE 'latest', only migration numbers or\n * just run `npm run apply migration`\n */\nmodule.exports = {\n  targetMigration: '{{targetMigration}}',\n  latestMigration: '{{latestMigration}}',\n};\n";