"use strict";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const config = require("../config");

class MatchesService {
    constructor() {
        this._protoPath = `${__dirname + config.protoPath}/lol_stats.proto`;
        this._packageDefinition = protoLoader.loadSync(
            this._protoPath,
            {keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            }
        );
        this._matches_proto = grpc.loadPackageDefinition(this._packageDefinition).lol_stats;
        console.log(`MatchesService :: constructor :: registering service at ${config.matchStatsServiceURL}:${config.matchStatsServicePort}`);
        this._matchStatsClient = new this._matches_proto.Matches(`${config.matchStatsServiceURL}:${config.matchStatsServicePort}`,
        grpc.credentials.createInsecure());
    }

    getMatches(summonerName) {
        return new Promise((resolve, reject) => {
            if (!summonerName || summonerName === "") reject("Summoner name is required");
            this._matchStatsClient.getMatchesForSummoner({summonerName: summonerName}, (err, response) => {
                if (err) {
                    console.warn(`MatchesController :: get :: error calling service :: ${err}`);
                    return reject("Service is unavailable");
                }
                if (!response) return reject("Service is unavailable");
                return resolve(response.matches);
            });
        });
    }
}

module.exports = new MatchesService();