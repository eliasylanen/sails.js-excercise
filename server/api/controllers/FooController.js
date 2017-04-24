module.exports = {
  bar: (req, res) => {
    res.json({ message: 'hello' });
  },
  foobar: (req, res) => {
    console.log(req.body);
    res.ok();
  },
  editBoard: (req, res) => {
    console.log(req.param('boardId'));
    res.ok();
  },
};
