import program from 'commander';

import exportVendor from './export-vendor';
import cleanVendor from './clean-vendor';

program
  .version('0.0.1')
  .command('export-vendor')
  .action(exportVendor);

program
  .version('0.0.1')
  .command('clean-vendor')
  .action(cleanVendor);

program.parse(process.argv);
