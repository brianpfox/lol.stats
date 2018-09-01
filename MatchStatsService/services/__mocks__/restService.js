"use strict";

const RestService = jest.genMockFromModule("RestService");

async function get(url, method="GET", headers) {
    return{ url, method, headers };
}

module.exports.RestService = RestService;
