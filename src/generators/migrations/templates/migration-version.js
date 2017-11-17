export default `
/**
 * DO NOT USE 'latest', only migration numbers or
 * just run \`npm run apply migration\`
 */
module.exports = {
  targetMigration: '{{targetMigration}}',
  latestMigration: '{{latestMigration}}',
};
`;
