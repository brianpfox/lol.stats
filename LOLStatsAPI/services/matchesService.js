"use strict";

const PROTO_PATH = __dirname + "/../../protos/matches/lol_stats.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const config = require("../config");

class MatchesService {
    constructor() {
        this._packageDefinition = protoLoader.loadSync(
            PROTO_PATH,
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
            this._matchStatsClient.getMatchesForSummoner({summonerName: summonerName}, (err, response) => {
                if (err) return reject(err);
                if (!response) return reject("Service unreachable");
                return resolve(response.matches);
            });
        });
    }
}

module.exports = new MatchesService();