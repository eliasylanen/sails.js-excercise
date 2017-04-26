module.exports = {
  findAllBoards,
  findBoard,
  createBoard,
  deleteBoard,
  editBoard,
};

// function findAllBoards(req, res) {
//   Board.find({})
//     .then(data => {
//       return !data || data.join() === [].join()
//         ? res.notFound('No boards found')
//         : res.ok(data);
//     })
//     .catch(e => res.badRequest(e));
// }

async function findAllBoards(req, res) {
  try {
    const data = await Board.find({});
    return !data || data.join() === [].join()
      ? res.notFound('No boards found')
      : res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

// function findBoard(req, res) {
//   Board.findOne(req.param('boardId')
//     .then(data => (!data ? res.notFound('Board not found') : res.ok(data)))
//     .catch(e => res.badRequest(e));
// }

async function findBoard(req, res) {
  try {
    const data = await Board.findOne(req.param('boardId').toString());
    return !data || _.isEmpty(data)
      ? res.notFound('Board not found')
      : res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

// function createBoard(req, res) {
//   Board.create({ name: req.body.name })
//     .then(data => res.created(data))
//     .catch(e => res.badRequest(e));
// }

async function createBoard(req, res) {
  try {
    const data = await Board.create({ name: req.body.name });
    return res.created(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

// function deleteBoard(req, res) {
//   Board.destroy({ id: req.param('boardId') })
//     .then(data => res.ok(data))
//     .catch(e => res.badRequest(e));
// }

async function deleteBoard(req, res) {
  try {
    const data = await Board.destroy(req.param('boardId').toString());
    return res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

// function editBoard(req, res) {
//   Board.update({ id: req.param('boardId') }, { name: req.body.name })
//     .then(data => res.ok(data))
//     .catch(e => res.badRequest(e));
// }

async function editBoard(req, res) {
  try {
    const data = await Board.update(req.param('boardId').toString(), {
      name: req.body.name,
    });
    return res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}
