import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import Match from "./match";
import "./matches.css";

export default class Matches extends Component {
    render() {
        const { summoner, matches, error } = this.props;

        if (error && error !== "") {
            return (
                <div className="matches">
                    <div className="matches_error">
                        {error}
                    </div>
                </div>
            );
        }

        let jsxMatchesList = [];
        if (matches) {
            matches.map(match => {
                return jsxMatchesList.push(
                    <Match key={match.get("gameId")} match={match} />
                );
            });
        }

        const gameCount = matches ? matches.size : 0;

        const jsxSummoner = summoner ? `${summoner}'s last ${gameCount} game${gameCount > 1 ? "s" : ""}` : "";

        const jsxMatches = (
            <div className="matches">
                <div className="matches_summonerWrap">
                    <div className="matches_summonerWrap_summoner">
                        {jsxSummoner}
                    </div>
                </div>
                <div className="matches_list">
                    {jsxMatchesList}
                </div>
            </div>
        );

        return jsxMatches;
    }
}

Matches.propTypes = {
    summoner: PropTypes.string,
    matches: PropTypes.objectOf(Immutable.Map).isRequired,
    error: PropTypes.string.isRequired,
}

