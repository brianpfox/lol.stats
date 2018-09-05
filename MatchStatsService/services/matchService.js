"use strict";

const inspect = require("util").inspect;
const _ = require("lodash");
const async = require("async");
const { RestService } = require("./restService");

class MatchService extends RestService {
    constructor(apiURL, apiKey) {
        super();

        // Fail fast without required parameters
        if (!apiURL || apiURL === "") throw new TypeError("API URL is required");
        if (!apiKey || apiKey === "") throw new TypeError("API Key is required");

        this._apiURL = apiURL;
        this._apiKey = apiKey;
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
            console.log(`MatchService :: getMatchesForSummoner :: found summoner ${inspect(summoner)}`);
            if (summoner && summoner.accountId) {
                try {
                    const matches = await this._findMatchesByAccountID(summoner.accountId);
                    let matchesToSearch = [];
                    console.log(`MatchService :: getMatchesForSummoner :: total games ${inspect(matches.totalGames)}`);
                    if (matches.totalGames > 5)
                        matchesToSearch = _.take(matches.matches, 5);
                    else matchesToSearch = matches.matches;
                    console.log(`MatchService :: getMatchesForSummoner :: matches to search ${inspect(matchesToSearch)}`);
                    let matchIDs = _.map(matchesToSearch, "gameId");
                    console.log(`MatchService :: getMatchesForSummoner :: finding match details for  ${inspect(matchIDs)}`);
                    const matchDetails = await this._findMatchDetailsForAll(matchIDs);

                    const allInfo = _.map(matchesToSearch, (match) => {
                        match.matchDetail = matchDetails[match.gameId];
                        return match;
                    });
                    return allInfo;
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

    async getMatchByID_async(matchID)
    {
        if (!matchID || matchID === "") throw new TypeError("Match ID is required");
        console.log(`MatchService :: getMatchByID_async :: ${matchID}`);
        try {
            return await this._findMatchDetails(matchID);
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
        return await this.get(`${this._apiURL}/lol/summoner/v3/summoners/by-name/${summonerName}`, "GET", {
            "X-Riot-Token": this._apiKey
        });
    }

    async _findMatchesByAccountID(accountID) {
        if (!accountID || accountID === "") throw new TypeError("Account ID is required");

        // TODO: IMPLEMENT CACHEING
        // TODO: HANDLE RATE LIMITING
        return await this.get(`${this._apiURL}/lol/match/v3/matchlists/by-account/${accountID}`, "GET", {
            "X-Riot-Token": this._apiKey
        });
    }

    async _findMatchDetails(matchID) {
        if (!matchID || matchID === "") throw new TypeError("Match ID is required");

        // TODO: IMPLEMENT CACHEING
        // TODO: HANDLE RATE LIMITING
        return await this.get(`${this._apiURL}/lol/match/v3/matches/${matchID}`, "GET", {
            "X-Riot-Token": this._apiKey
        });
    }

    async _findMatchDetailsForAll(matchIDs) {
        const self = this;
        let matches = {};

        let p = new Promise((resolve, reject) => {
            async.each(matchIDs, (matchID, cb) => {
                self._findMatchDetails(matchID)
                .then(match => {
                    matches[matchID] = match;
                    cb();
                })
                .catch(e => cb(e));
            }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(matches);
            });
        });

        await p;

        return matches;
    }
}

module.exports = MatchService;