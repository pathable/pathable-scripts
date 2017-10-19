const inputSchema = {
  properties: {
    featurePrefix: {
      description: 'Enter a prefix to use for the applications.',
      message: 'Invalid command',
      type: 'string',
      required: true,
    },
  },
};

export default inputSchema;
