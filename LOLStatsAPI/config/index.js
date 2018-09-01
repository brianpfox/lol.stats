"use strict";

// const path = require("path");

const getEnvVar = (name, defaultVal) => {
    return process.env[name] ? process.env[name] : defaultVal;
};

module.exports =  {
    env: getEnvVar("NODE_ENV", "development"),
    appName: "LOLStatsAPI",
    port: getEnvVar("PORT", 3001),
};