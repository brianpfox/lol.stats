"use strict";

const fetch = require('isomorphic-fetch');
const validMethod = "GET"; //TODO:  Enable all http methods ["GET", "POST", "PUT", "PATCH", "DELETE"];

class RestService {
    async get(url, method="GET", headers) {
        if (!url || url === "") throw new TypeError("URL is required");
        if (!method || method !== validMethod) throw new TypeError("Method is not valid");

        let options = {
            method: method,
            headers: headers,
        };
        const response = await fetch(url, options);
        if (response.status >= 400)
            throw await response.json();
        return await response.json();
    }
}

module.exports.RestService = RestService;
