const inputSchema = {
  properties: {
    featurePrefix: {
      description: 'Enter a prefix to use for the applications.',
      message: 'Invalid command',
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
  },
};

export default inputSchema;
