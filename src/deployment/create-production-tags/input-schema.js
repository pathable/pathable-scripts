import moment from 'moment';

const date = moment().format('YYMMDD-HHmm');
const defaultTagName = `production-${date}`;

const inputSchema = {
  properties: {
    branchToMerge: {
      description: '(Optionally) Specify branch name to merge into master, before creating the tag. Leave blank to skip.',
      type: 'string',
      required: false,
    },
    tagName: {
      default: defaultTagName,
      description: 'Specify Tag name for tagging the repositories',
      message: 'Invalid tag name',
      type: 'string',
      required: true,
    },
  },
};

export default inputSchema;
