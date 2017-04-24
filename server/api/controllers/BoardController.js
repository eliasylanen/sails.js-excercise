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
};
