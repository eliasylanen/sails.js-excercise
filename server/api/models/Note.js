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

  beforeCreate: async (values, next) => {
    try {
      const data = await Board.findOne(values.owner.toString());
      console.log(data);
      return !data || _.isEmpty(data) || data.id !== values.owner
        ? next('Target board not found')
        : next();
    } catch (error) {
      return next(error);
    }
  },
};
