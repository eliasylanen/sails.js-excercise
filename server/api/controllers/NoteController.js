module.exports = {
  findNotes,
  createNote,
  deleteNote,
  editNote,
};

// function findNotes(req, res) {
//   Board.findOne(req.param('boardId').toString())
//     .populate('notes')
//     .then(data => (!data ? res.notFound('No notes found') : res.ok(data)))
//     .catch(e => res.badRequest(e));
// }

async function findNotes(req, res) {
  try {
    const data = await Board.findOne(req.param('boardId').toString()).populate(
      'notes'
    );
    return !data || _.isEmpty(data)
      ? res.notFound('No notes found')
      : res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

// function createNote(req, res) {
//   Note.create({ message: req.body.message, owner: req.body.owner })
//     .then(data => res.created(data))
//     .catch(e => res.badRequest(e));
// }

async function createNote(req, res) {
  try {
    const data = await Note.create({
      message: req.body.message,
      owner: req.body.owner,
    });
    return res.created(data);
  } catch (error) {
    res.badRequest(error);
  }
}

// function deleteNote(req, res) {
//   Note.destroy(req.param('noteId').toString())
//     .then(data => res.ok(data))
//     .catch(e => res.badRequest(e));
// }

async function deleteNote(req, res) {
  try {
    const data = await Note.destroy(req.param('noteId').toString());
    return res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

// function editNote(req, res) {
//   const message = req.body.message;
//   const done = req.body.done;
//   const updateValues = {};
//   message &&
//     Object.defineProperty(updateValues, 'message', {
//       value: message,
//       enumerable: true,
//       configurable: true,
//     });
//   done &&
//     Object.defineProperty(updateValues, 'done', {
//       value: done,
//       enumerable: true,
//       configurable: true,
//     });

//   Note.update(req.param('noteId').toString(), updateValues)
//     .then(data => res.ok(data))
//     .catch(e => res.badRequest(e));
// }

async function editNote(req, res) {
  try {
    const message = req.body.message;
    const done = req.body.done;
    const updateValues = {};
    message &&
      Object.defineProperty(updateValues, 'message', {
        value: message,
        enumerable: true,
      });
    done &&
      Object.defineProperty(updateValues, 'done', {
        value: done,
        enumerable: true,
      });
    const data = await Note.update(
      req.param('noteId').toString(),
      updateValues
    );
    res.ok(data);
  } catch (error) {
    res.badRequest(error);
  }
}
