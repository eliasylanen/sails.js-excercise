module.exports = async function noteExists(req, res, next) {
  try {
    const data = await Note.findOne(req.param('noteId').toString());
    return !data || _.isEmpty(data)
      ? res.notFound('Note not found, someone might have deleted it')
      : next();
  } catch (error) {
    return next(error);
  }
};
