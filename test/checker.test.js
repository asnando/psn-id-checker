const { expect } = require('chai');
const checkIdAvailabity = require('../api');

const { log: print } = console;

const userMayBeUnvailable = 'bot';
const userMayBeAvailable = 'uhdueh';

function mockRequest(id) {
  return {
    body: {
      id,
    },
  };
}

function mockResponse(callback) {
  return {
    json: callback,
  };
}

async function callAvailabilityChecker(id, expected, message) {
  return new Promise(function(resolve, reject) {
    function onResponse(result) {
      const { available: isAvailable } = result;
      try {
        print(`${message}:`);
        expect(isAvailable).to.equal(expected);
        print('> ok');
        resolve();
      } catch (exception) {
        print('> fail!');
        reject(exception);
      }
    }
    checkIdAvailabity(mockRequest(id), mockResponse(onResponse));
  });
}

async function main() {
  await callAvailabilityChecker(userMayBeUnvailable, false, `Expected "${userMayBeUnvailable}" to be unavailable`);
  await callAvailabilityChecker(userMayBeAvailable, true, `Expected "${userMayBeAvailable}" to be available`);
}

main();
