"use strict";

const inspect = require("util").inspect;

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

    getMatchesForSummoner(call, cb)
    {
        if (!call || !call.request.summonerName || call.request.summonerName === "") 
            return cb("gRPC Request :: Summoner name is required");
        this.getMatchesForSummoner_async(call.request.summonerName)
        .then(matches => {
            cb(null, {matches: JSON.stringify(matches)});
        })
        .catch(err => {
            console.warn(`MatchService :: getMatchesForSummoner :: error :: ${inspect(err)}`);
            cb(err);
        });
    }

    async getMatchesForSummoner_async(summonerName)
    {
        if (!summonerName || summonerName === "") throw new TypeError("Summoner name is required");
        console.log(`MatchService :: getMatchesForSummoner :: ${summonerName}`);
        try {
            const summoner = await this._findSummoner(summonerName);
            console.log(`MatchService :: getMatchesForSummoner :: found summoner ${summoner}`);
            if (summoner && summoner.accountId) {
                try {
                    return await this._findMatchesByAccountID(summoner.accountId);
                }
                catch(e) {
                    throw(e);
                }
            }
        }
        catch(e)
        {
            throw(e);
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