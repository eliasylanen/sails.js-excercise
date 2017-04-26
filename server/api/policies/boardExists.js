module.exports = function boardExists(req, res, next) {
  Board.findOne(req.param('boardId').toString()).then(data => {
    return !data || _.isEmpty(data)
      ? res.notFound('Board not found, someone might have deleted it')
      : next();
  });
};
