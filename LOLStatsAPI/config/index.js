"use strict";

// const path = require("path");

const getEnvVar = (name, defaultVal) => {
    return process.env[name] ? process.env[name] : defaultVal;
};

module.exports =  {
    env: getEnvVar("NODE_ENV", "development"),
    appName: "LOLStatsAPI",
    port: getEnvVar("PORT", 3001),
    logLevel: getEnvVar("LOG_LEVEL", "silly"),
    matchStatsServiceURL: getEnvVar("SAMPLE_SERVICE_URL", "localhost"),
    matchStatsServicePort: getEnvVar("SAMPLE_SERVICE_PORT", 3010),
    protoPath: getEnvVar("PROTO_PATH", "/../../protos/matches")
};