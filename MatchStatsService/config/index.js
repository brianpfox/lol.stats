"use strict";

const getEnvVar = (name, defaultVal) => {
    return process.env[name] ? process.env[name] : defaultVal;
};

module.exports =  {
    env: getEnvVar("NODE_ENV", "development"),
    appName: "MatchStatsService",
    port: getEnvVar("PORT", 3010),
    logLevel: getEnvVar("LOG_LEVEL", "silly"),
    apiURL: getEnvVar("RIOT_API_URL", "https://na1.api.riotgames.com"),
    apiKey: getEnvVar("RIOT_API_KEY", "xxx")
};