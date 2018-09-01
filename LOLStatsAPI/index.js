"use strict";

const express = require("express");
const router = express.Router();
const http = require("http");
const { createLogger, format, transports } = require('winston');

const config = require("./config");

class Application {
    constructor() {
        this._config = config;
        this._logger = this._configureLogging();

        this._app = express();
        this._registerMiddlewares(this._app);
        this._registerRoutes(this._app, router);
        this._server = http.createServer(this._app);
    }

    _configureLogging() {
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
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    }

    _registerRoutes(app, router) {
        app.use("/", (req, res) => {
            res.send("Hello World");
        });
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
