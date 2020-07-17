const checkIdAvailabity = require('./check');

exports.handler = async function(event) {
  const query = event.queryStringParameters;
  const params = event.pathParameters;
  const { id } = query || params || event;

  function respondWithStatus(availability) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        id,
        available: availability,
      }),
    };
  }

  if (!id) {
    return respondWithStatus(false);
  }

  return checkIdAvailabity(id)
    .then((isAvailable) => respondWithStatus(isAvailable))
    .catch(() => respondWithStatus(false));
};