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

  beforeDestroy: (criteria, next) => {
    Note.destroy({ owner: criteria.where.id })
      .then(() => next())
      .catch(e => next(e));
  },
};
