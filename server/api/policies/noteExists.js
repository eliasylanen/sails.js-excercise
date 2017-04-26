module.exports = function noteExists(req, res, next) {
  Note.findOne(req.param('noteId').toString()).then(data => {
    return !data || _.isEmpty(data)
      ? res.notFound('Note not found, someone might have deleted it')
      : next();
  });
};
