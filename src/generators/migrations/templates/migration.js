export default `
import { Migrations } from 'meteor/percolate:migrations';

Migrations.add({
  version: {{timestamp}},
  name: '{{migrationName}}',
  up() {

  },
  down() {

  },
});
`;
