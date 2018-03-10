const inputSchema = {
  properties: {
    commandString: {
      description: 'Enter command to run against the repositories',
      message: 'Invalid command',
      type: 'string',
      required: true,
    },
  },
};

export default inputSchema;
