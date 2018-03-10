const inputSchema = {
  properties: {
    tagName: {
      description: 'Specify Tag name to remove from the repositories',
      message: 'Invalid tag name',
      type: 'string',
      required: true,
    },
  },
};

export default inputSchema;
