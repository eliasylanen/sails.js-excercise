const findAllBoards = (req, res) => {
  Board.find({})
    .then(data => {
      res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
};
const findBoard = (req, res) => {
  Board.findOne(req.param('boardId').toString())
    .then(data => {
      res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
};
const createBoard = (req, res) => {
  Board.create({ name: req.body.name })
    .then(data => {
      res.created(data);
    })
    .catch(e => {
      res.badRequest(e.invalidAttributes);
    });
};
const deleteBoard = (req, res) => {
  Board.destroy({ id: req.param('boardId') })
    .then(data => {
      res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
};
const editBoard = (req, res) => {
  Board.findOne(req.param('boardId').toString())
    .then(data => {
      !data || data === []
        ? res.notFound('Nothing found')
        : Board.update(data.id.toString(), { name: req.body.name })
            .then(data => {
              res.ok(data);
            })
            .catch(e => {
              res.badRequest(e.invalidAttributes);
            });
    })
    .catch(e => {
      res.badRequest(e);
    });
};

module.exports = {
  findAllBoards,
  findBoard,
  createBoard,
  deleteBoard,
  editBoard,
};
