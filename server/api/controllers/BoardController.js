module.exports = {
  findAllBoards,
  findBoard,
  createBoard,
  deleteBoard,
  editBoard,
};

function findAllBoards(req, res) {
  Board.find({})
    .then(data => {
      return !data || data.join() === [].join()
        ? res.notFound('No boards found')
        : res.ok(data);
    })
    .catch(e => res.badRequest(e));
}

function findBoard(req, res) {
  Board.findOne(req.param('boardId').toString())
    .then(data => (!data ? res.notFound('Board not found') : res.ok(data)))
    .catch(e => res.badRequest(e));
}

function createBoard(req, res) {
  Board.create({ name: req.body.name })
    .then(data => res.created(data))
    .catch(e => res.badRequest(e));
}

function deleteBoard(req, res) {
  Board.destroy({ id: req.param('boardId') })
    .then(data => res.ok(data))
    .catch(e => res.badRequest(e));
}

function editBoard(req, res) {
  Board.update({ id: req.param('boardId') }, { name: req.body.name })
    .then(data => res.ok(data))
    .catch(e => res.badRequest(e));
}
