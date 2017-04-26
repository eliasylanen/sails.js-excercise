module.exports = {
  findAllBoards,
  findBoard,
  createBoard,
  deleteBoard,
  editBoard,
};

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

async function createBoard(req, res) {
  try {
    const data = await Board.create({ name: req.body.name });
    return res.created(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

async function deleteBoard(req, res) {
  try {
    const data = await Board.destroy(req.param('boardId').toString());
    return res.ok(data);
  } catch (error) {
    return res.badRequest(error);
  }
}

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
