"use strict";

const { RestService } = require("../../services/restService");

const EXPECTED_REQUIRED_URL = "URL is required";
const EXPECTED_BAD_METHOD = "Method is not valid";
const TEST_URL = "https://jsonplaceholder.typicode.com/todos/1";


describe("restService", () => {
    const restService = new RestService();
    
    test("should exist", () => {
        expect(restService).toBeDefined();
    });

    describe("get", () => {
        test("should fail with a missing URL", async () => {
            try {
                let response = await restService.get(null);
                expect(response).toBeUndefined();
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_URL);
            }
        });

        test("should fail with a bad URL", async () => {
            const badURL = "http://badURL.badURL";
            try {
                let response = await restService.get(badURL);
                expect(response).toBeUndefined();
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(typeof e.message).toBe("string");
            }
        });

        test("should succeed with a GET request to a good URL", async () => {
            const goodURL = TEST_URL;
            try {
                let response = await restService.get(goodURL);
                expect(response).toBeDefined();
            }
            catch(e) {
                expect(e).toBeUndefined();
            }
        });

        test("should fail with an invalid method", async () => {
            const goodURL = TEST_URL;
            try {
                let response = await restService.get(goodURL, "xxx");
                expect(response).toBeUndefined();
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_BAD_METHOD);
            }
        });

        test.skip("should successfully pass headers if specified", () => {})
    });
});