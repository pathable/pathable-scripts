"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\nimport { Migrations } from 'meteor/percolate:migrations';\n\nMigrations.add({\n  version: {{timestamp}},\n  name: '{{migrationName}}',\n  up() {\n\n  },\n  down() {\n\n  },\n});\n";