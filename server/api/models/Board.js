module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    notes: {
      collection: 'note',
      via: 'owner',
    },
  },
};
