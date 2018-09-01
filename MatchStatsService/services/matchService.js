"use strict";

class MatchService {
    constructor(apiURL, apiKey, restService) {
        // Fail fast without required parameters
        if (!apiURL || apiURL === "") throw new TypeError("API URL is required");
        if (!apiKey || apiKey === "") throw new TypeError("API Key is required");
        if (!restService || restService === "") throw new TypeError("RestService is required");

        this._apiURL = apiURL;
        this._apiKey = apiKey;
        this._restService = restService
    }

    async getMatchesForSummoner(summonerName, cb)
    {
        if (!summonerName || summonerName === "") throw new TypeError("Summoner name is required");

        try {
            const summoner = await this._findSummoner(summonerName);
            if (summoner && summoner.accountId) {
                try {
                    const matches = await this._findMatchesByAccountID(summoner.accountId);
                    cb(null, matches);
                }
                catch(e) {
                    cb(e);
                }
            }
        }
        catch(e)
        {
            cb(e);
        }
    }

    async _findSummoner(summonerName) {
        if (!summonerName || summonerName === "") throw new TypeError("Summoner name is required");

        // TODO: IMPLEMENT CACHEING
        // TODO: HANDLE RATE LIMITING
        return await this._restService.get(`${this._apiURL}/lol/summoner/v3/summoners/by-name/${summonerName}`, "GET", {
            "X-Riot-Token": this._apiKey
        });
    }

    async _findMatchesByAccountID(accountID) {
        if (!accountID || accountID === "") throw new TypeError("Account ID is required");

        // TODO: IMPLEMENT CACHEING
        // TODO: HANDLE RATE LIMITING
        return await this._restService.get(`${this._apiURL}/lol/match/v3/matchlists/by-account/${accountID}`, "GET", {
            "X-Riot-Token": this._apiKey
        });
    }
}

module.exports.MatchService = MatchService;