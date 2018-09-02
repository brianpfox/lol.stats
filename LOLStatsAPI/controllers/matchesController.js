"use strict";

const service = require("../services/matchesService");

class MatchesController {
    /*
     *  /api/matches
     *  @summonerName = Name of summoner to look up
     */
    async get(req, res) {
        const summonerName = req.query.summonerName ? req.query.summonerName : null;
        console.log(`MatchesController :: get :: summonerName = ${summonerName}`);

        try {
            const result = await service.getMatches(summonerName);
            res.send(result);
        }
        catch(err) {
            res.send({
                error: err
            });
        }
    }
}

module.exports = new MatchesController();