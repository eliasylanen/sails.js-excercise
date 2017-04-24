module.exports = {
  createBoard: (req, res) => {
    Board.create(req.body)
      .then(data => {
        res.created(data);
      })
      .catch(e => {
        res.badRequest(e);
      });
  },
  deleteBoard: (req, res) => {
    Board.destroy({ id: req.param('boardId') })
      .then(data => {
        res.ok(data);
      })
      .catch(e => {
        res.badRequest();
      });
  },
};
