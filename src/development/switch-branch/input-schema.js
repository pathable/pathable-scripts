const inputSchema = {
  properties: {
    branchName: {
      description: 'Enter the name of the branch that you want to switch to.',
      message: 'Invalid command',
      type: 'string',
      required: true,
    },
    stashUncommittedChanges: {
      default: 'y',
      description: 'Stash uncommitted changes in the repositories. (y)es or (n)o.',
      message: 'Invalid option. Press "y" or "n"',
      type: 'string',
      enum: ['y', 'n'],
      required: true,
    },
  },
};

export default inputSchema;
