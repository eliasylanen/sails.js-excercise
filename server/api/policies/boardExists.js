module.exports = async function boardExists(req, res, next) {
  try {
    const data = await Board.findOne(req.param('boardId').toString());
    return !data || _.isEmpty(data)
      ? res.notFound('Board not found, someone might have deleted it')
      : next();
  } catch (error) {
    return next(error);
  }
};
