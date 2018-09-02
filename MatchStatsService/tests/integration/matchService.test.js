"use strict";

const env = require("../../.env").init(); // eslint-disable-line no-unused-vars
const { MatchService } = require("../../services/matchService");
const { RestService } = require("../../services/restService");
const config = require("../../config");

// const EXPECTED_REQUIRED_API_URL = "API URL is required";
const VALID_SUMMONER = "BFY%20Meowington";
const VALID_ACCOUNTID = 215942119;
const VALID_MATCHID = 2853140570;

describe("matchService", () => {
    const restService = new RestService();
    describe("_findSummoner", () => {
        const matchService = new MatchService(config.apiURL, config.apiKey, restService);

        test("should return an error if summoner name is not found", async () => {
            try {
                console.log(`env vars ${process.env.RIOT_API_KEY}`);
                const summoner = await matchService._findSummoner("___");
                expect(summoner).toBeUndefined();
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.status).toBeDefined();
                expect(e.status.status_code).toBeDefined();
                expect(e.status.status_code).toBe(404);
            }
        });

        test("should return the summoner for a valid summoner name", async () => {
            const summoner = await matchService._findSummoner(VALID_SUMMONER);
            expect(summoner).toBeDefined();
            expect(summoner.accountId).toBeDefined();
            expect(summoner.accountId).toBe(VALID_ACCOUNTID);
        });
    });

    describe("_findMatchesByAccountID", () => {
        const matchService = new MatchService(config.apiURL, config.apiKey, restService);

        test("should return an error if account id is not found", async () => {
            try {
                const matches = await matchService._findMatchesByAccountID(1);
                expect(matches).toBeUndefined();
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.status).toBeDefined();
                expect(e.status.status_code).toBeDefined();
                expect(e.status.status_code).toBe(404);
            }
        });

        test("should return the matches for a valid accountID", async () => {
            const matches = await matchService._findMatchesByAccountID(VALID_ACCOUNTID);
            expect(matches).toBeDefined();
            expect(matches.matches).toBeDefined();
        });
    });

    describe("_findMatchDetails", () => {
        const matchService = new MatchService(config.apiURL, config.apiKey, restService);

        test("should return an error if the match is not found", async () => {
            try {
                const match = await matchService._findMatchDetails(1);
                expect(match).toBeUndefined();
            }
            catch(e) {
                expect(e).toBeDefined();
                expect(e.status).toBeDefined();
                expect(e.status.status_code).toBeDefined();
                expect(e.status.status_code).toBe(404);
            }
        });

        test("should return the match details for a valid matchID", async () => {
            const match = await matchService._findMatchDetails(VALID_MATCHID);
            expect(match).toBeDefined();
            expect(match.gameId).toBeDefined();
            expect(match.gameId).toBe(VALID_MATCHID);
        });
    });
});