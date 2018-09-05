"use strict";

const MatchService = require("../../services/matchService");
// jest.mock("../../services/matchService");

const EXPECTED_REQUIRED_API_URL = "API URL is required";
const EXPECTED_REQUIRED_API_KEY = "API Key is required";
const EXPECTED_REQUIRED_REST_SERVICE = "RestService is required";
const EXPECTED_REQUIRED_SUMMONER_NAME = "gRPC Request :: Summoner name is required";
const EXPECTED_REQUIRED_SUMMONER_NAME_ASYNC = "Summoner name is required";

describe("matchService", () => {
    test("should exist", () => {
        expect(MatchService).toBeDefined();
    });

    describe("constructor", () => {
        test("should fail with missing API URL", () => {
            try {
                new MatchService(null, "key");
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_API_URL);
            }
        });

        test("should fail with missing API Key", () => {
            try {
                new MatchService("URL", null);
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_API_KEY);
            }
        });

        test("should fail with missing RestService", () => {
            try {
                new MatchService("URL", "Key", null);
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_REST_SERVICE);
            }
        });

        test("should succeed with required args", () => {
            const matchService = new MatchService("URL", "KEY");
            expect(matchService).toBeDefined();
        });
    });

    describe("_findSummoner", () => {
        const matchService = new MatchService("URL", "KEY");
        matchService.get = jest.fn();

        test("should exist", () => {
            expect(matchService._findSummoner).toBeDefined();
        });

        test("should fail with a missing summoner name", async () => {
            try {
                await matchService._findSummoner(null);
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_SUMMONER_NAME_ASYNC);
            }
        });

        test("should call RestService if summoner name is present", () => {
            expect(matchService.get).not.toHaveBeenCalled();
            matchService._findSummoner("name");
            console.log(`get called: ${matchService.get.mock.calls.length}`);
            expect(matchService.get).toHaveBeenCalled();
        });
    });

    describe("getMatchesForSummoner", () => {
        const matchService = new MatchService("URL", "KEY");
        matchService.get = jest.fn();

        test("should exist", () => {
            expect(matchService.getMatchesForSummoner).toBeDefined();
        });

        test("should fail with a missing summoner name", () => {
            matchService.getMatchesForSummoner(null, (err, matches) => {
                expect(err).toBeDefined();
                expect(err).toBe(EXPECTED_REQUIRED_SUMMONER_NAME);
                expect(matches).toBeUndefined();
            });
        });

        test.skip("should return proper error message if summoner name is not found", () => {

        });

        test.skip("should return empty set if no matched are found for a summoner", () => {

        });

        test.skip("should return a list of matches for a found summoner", () => {

        });
    });
});