"use strict";

const express = require("express");
const router = express.Router();
const http = require("http");
const helmet = require("helmet");
const logger = require("morgan");
const { createLogger, format, transports } = require('winston');

const config = require("./config");
const { Routes } = require("./routes");
const matchesController = require("./controllers/matchesController");

class Application {
    constructor() {
        this._config = config;
        this._logger = this._configureLogging();

        this._app = express();
        this._registerMiddlewares(this._app);
        this._registerRoutes(this._app, router, matchesController);
        this._server = http.createServer(this._app);
    }

    _configureLogging() {
        // TODO:  Abstract this to another class
        const logger = createLogger({
            level: this._config.logLevel,
            format: format.combine(
                format.label({ label: this._config.appName }),
                format.timestamp(),
                format.prettyPrint()
              ),
            transports: [
                new transports.Console(),
            ]
        });

        return logger;
    }
    
    _registerMiddlewares(app) {
        app.use(helmet());
        app.use(logger("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    }

    _registerRoutes(app, router, controller) {
        app.use("/api", (new Routes(router, controller)).configureRoutes());
    }

    start() {
        this._server.listen(config.port, () => {
            this._logger.info(`Application is listening on port ${config.port}`);
            this._logger.info(`Pid is ${process.pid}`);
            this._logger.info(`Version is ${process.version}`);
            this._logger.info(`Environment: ${config.env}`);
        });
    }

}

const app = new Application();
app.start();
