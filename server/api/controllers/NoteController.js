module.exports = {
  findNotes,
  createNote,
  deleteNote,
  editNote,
};

function findNotes(req, res) {
  Board.findOne({ id: req.param('boardId') })
    .populate('notes')
    .then(data => {
      !data ? res.notFound('No notes found') : res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function createNote(req, res) {
  Board.find({})
    .then(data => {
      const boardIds = data.map(value => value.id.toString());
      return boardIds.includes(req.body.owner)
        ? Note.create({ message: req.body.message, owner: req.body.owner })
            .then(data => {
              res.created(data);
            })
            .catch(e => {
              res.badRequest(e);
            })
        : res.notFound('No such board');
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function deleteNote(req, res) {
  Note.destroy({ id: req.param('noteId') })
    .then(data => {
      !data || data.join() === [].join()
        ? res.notFound('Note not found, someone might have deleted it already')
        : res.ok(data);
    })
    .catch(e => {
      res.badRequest(e);
    });
}

function editNote(req, res) {
  const message = req.body.message;
  const done = req.body.done;
  const updateValues = {};
  message &&
    Object.defineProperty(updateValues, 'message', {
      value: message,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  done &&
    Object.defineProperty(updateValues, 'done', {
      value: done,
      writable: true,
      enumerable: true,
      configurable: true,
    });

  Note.findOne(req.param('noteId').toString())
    .then(data => {
      return !data || data === []
        ? res.notFound('Note not found, someone might have deleted it')
        : Note.update(data.id.toString(), updateValues)
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
