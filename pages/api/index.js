const fetch = require('node-fetch');

const API_URL = process.env.API_URL;

function createRequestBody(id) {
  return {
    "onlineId": id,
    "reserveIfAvailable": false,
  };
}

async function checkIdAvailabity(id) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(API_URL, {
      method: 'post',
      body: JSON.stringify(createRequestBody(id)),
      headers,
    });

    const statusCode = response.status;

    if (statusCode >= 200 && statusCode < 300) {
      return true;
    }
    // if (statusCode >= 400 && statusCode < 500) {
    //   throw new Error("Account with this id already exists or its not available.");
    // }
    // throw new Error("PSN returned an error.");
    return false;
  } catch (exception) {
    throw exception;
  }
};

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
