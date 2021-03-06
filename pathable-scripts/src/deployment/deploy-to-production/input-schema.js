const inputSchema = {
  properties: {
    tagName: {
      description: 'Select tag name for deployment',
      message: 'Invalid tag name',
      type: 'string',
      required: true,
    },
    deploySupervisor: {
      default: 'y',
      description: 'Deploy Supervisor. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    deployAdmin: {
      default: 'y',
      description: 'Deploy Admin. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    deployApp: {
      default: 'y',
      description: 'Deploy App. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    deployJobs: {
      default: 'y',
      description: 'Deploy Jobs. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    deployMailer: {
      default: 'y',
      description: 'Deploy Mailer. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    runAppUnitTests: {
      default: 'y',
      description: 'Run unit tests for the selected applications. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    /*
    runPackageUnitTests: {
      default: 'n',
      description: 'Run unit tests for the dependent packages. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
    */
    doParallelDeployments: {
      default: 'n',
      description: 'Run scripts in parallel where possible. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
  },
};

export default inputSchema;
