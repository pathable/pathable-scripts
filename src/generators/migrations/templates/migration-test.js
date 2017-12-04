export default `
/* eslint "no-unused-expressions": "off" */
/* eslint "no-unused-vars": "off" */
import chai from 'chai';
import sinonChai from 'sinon-chai';
import runMigrationTest from './run-migration-test';

const migrationNumber = '{{migrationNumber}}';
const previousMigrationNumber = '{{previousMigrationNumber}}';

chai.should();
chai.use(sinonChai);
const expect = chai.expect;

const generateData = () => {
  // Data to be added before executing the migration
  /* INSERT CODE HERE */
};

const testUp = () => {
  // Tests that will run after applying the migration
  it('should run', () => {});

  /* INSERT CODE HERE */
};

const testDown = () => {
  // Once it was migrated up, it will migrate down and these tests will run
  it('should run', () => {});

  /* INSERT CODE HERE */
};

runMigrationTest({ generateData, testUp, testDown, migrationNumber, previousMigrationNumber });

`;
