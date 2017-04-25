module.exports = {
  attributes: {
    message: {
      type: 'string',
      required: true,
    },
    done: {
      type: 'boolean',
      required: true,
      defaultsTo: false,
      falsey: true,
    },
    owner: {
      model: 'board',
      required: true,
    },
  },
};
