"use strict";

const RestService = jest.genMockFromModule("RestService");

async function get(url, method="GET", headers) {  // eslint-disable-line no-unused-vars
    return{ url, method, headers };
}

module.exports.RestService = RestService;
