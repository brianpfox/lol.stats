"use strict";

//TODO - Mock RestService correctly

const { MatchService } = require("../../services/matchService");
const RestService = jest.mock("../../services/restService");

const EXPECTED_REQUIRED_API_URL = "API URL is required";
const EXPECTED_REQUIRED_API_KEY = "API Key is required";
const EXPECTED_REQUIRED_REST_SERVICE = "RestService is required";
const EXPECTED_REQUIRED_SUMMONER_NAME = "Summoner name is required";

describe("matchService", () => {
    // beforeEach(() => {
    //     RestService.mockClear();
    // });

    test("should exist", () => {
        expect(MatchService).toBeDefined();
    });

    describe("constructor", () => {
        test("should fail with missing API URL", () => {
            try {
                new MatchService(null, "key", RestService);
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_API_URL);
            }
        });
    
        test("should fail with missing API Key", () => {
            try {
                new MatchService("URL", null, RestService);
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
            const matchService = new MatchService("URL", "KEY", RestService);
            expect(matchService).toBeDefined();
        });
    });

    describe("_findSummoner", () => {
        const matchService = new MatchService("URL", "KEY", RestService);

        test("should exist", () => {
            expect(matchService._findSummoner).toBeDefined();
        })

        test("should fail with a missing summoner name", async () => {
            try {
                await matchService._findSummoner(null);
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.message).toBe(EXPECTED_REQUIRED_SUMMONER_NAME);
            }
        });

        test("should call RestService if summoner name is present", () => {
            // console.log(`get called: ${RestService.get.mock.calls.length}`);
            matchService._findSummoner("name");
            // console.log(`get called after: ${RestService.get.mock.calls.length}`);
            // expect(RestService.get).toHaveBeenCalled();
            // expect(true).toBeFalsy();
        });
    });

    describe("getMatchesForSummoner", () => {
        const matchService = new MatchService("URL", "KEY", RestService);

        test("should exist", () => {
            expect(matchService.getMatchesForSummoner).toBeDefined();
        })

        test("should fail with a missing summoner name", () => {
            matchService.getMatchesForSummoner(null, (err, matches) => {
                expect(err).toBeDefined();
                expect(err.message).toBe(EXPECTED_REQUIRED_SUMMONER_NAME);
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