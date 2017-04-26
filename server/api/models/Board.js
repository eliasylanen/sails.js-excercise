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

  beforeDestroy: async (criteria, next) => {
    try {
      await Note.destroy({ owner: criteria.where.id });
      return next();
    } catch (error) {
      return next(error);
    }
  },
};
