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
      !data || data.join() === [].join()
        ? res.notFound('No boards found')
        : res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function findBoard(req, res) {
  Board.findOne(req.param('boardId').toString())
    .then(data => {
      !data ? res.notFound('Board not found') : res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function createBoard(req, res) {
  Board.create({ name: req.body.name })
    .then(data => {
      res.created(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function deleteBoard(req, res) {
  const deleteBoard = Board.destroy({ id: req.param('boardId') });
  const deleteNotes = Note.destroy({ owner: req.param('boardId') });

  Promise.all([deleteBoard, deleteNotes])
    .then(data => {
      !data || data.join() === [[], []].join()
        ? res.notFound('Board not found, someone might have deleted it already')
        : res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function editBoard(req, res) {
  Board.findOne(req.param('boardId').toString())
    .then(data => {
      return !data || data === []
        ? res.notFound('Board not found, someone might have deleted it')
        : Board.update(data.id.toString(), { name: req.body.name })
            .then(data => {
              res.ok(data);
            })
            .catch(e => {
              res.badRequest(e);
            });
    })
    .catch(e => {
      res.badRequest(e);
    });
}
