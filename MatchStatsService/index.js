"use strict";

const PROTO_PATH = __dirname + "/../protos/matches/lol_stats.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { createLogger, format, transports } = require('winston');

const { MatchService } = require("./services/matchService");
const { RestService } = require("./services/restService");
const config = require("./config");

class Application {
    constructor() {
        this._logger = this._configureLogging();
        this._server = new grpc.Server();
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
        this._matchService = new MatchService(config.apiURL, config.apiKey, new RestService());
        this._server.addService(this._matches_proto.Matches.service, {
            GetMatchesForSummoner: this._matchService.getMatchesForSummoner
        });
    }

    _configureLogging() {
        //TODO: Abstract Logging to separate class
        const logger = createLogger({
            level: config.logLevel,
            format: format.combine(
                format.label({ label: config.appName }),
                format.timestamp(),
                format.prettyPrint()
              ),
            transports: [
                new transports.Console(),
            ]
        });

        return logger;
    }

    start() {
        this._server.bind(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure());
        this._logger.info(`Application is listening on port ${config.port}`);
        this._logger.info(`Pid is ${process.pid}`);
        this._logger.info(`Version is ${process.version}`);
        this._logger.info(`Environment: ${config.env}`);
        this._server.start();
    }
}

const app = new Application();
app.start();
