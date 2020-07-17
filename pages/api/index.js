const checkIdAvailabity = require('./check');

module.exports = function functionExporter(req, res) {
  const { query } = req;
  const { id } = query;

  function respondWithStatus(availability) {
    res.json({ available: availability });
  }

  if (!id) {
    return respondWithStatus(false);
  }

  checkIdAvailabity(id)
    .then((isAvailable) => respondWithStatus(isAvailable))
    .catch(() => respondWithStatus(false));
};
