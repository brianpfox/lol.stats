import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import Match from "./match";
import "./matches.css";

export default class Matches extends Component {
    render() {
        const { summoner, matches } = this.props;

        let jsxMatches = [];
        if (matches) {
            matches.map(match => {
                return jsxMatches.push(
                    <Match key={match.get("gameId")} match={match} />
                );
            });
        }

        const gameCount = matches ? matches.size : 0;

        let jsxSummoner = summoner ? `${summoner}'s last ${gameCount} game${gameCount > 1 ? "s" : ""}` : "";

        return (
            <div className="matches">
                <div className="matches_summonerWrap">
                    <div className="matches_summonerWrap_summoner">
                        {jsxSummoner}
                    </div>
                </div>
                <div className="matches_list">
                    {jsxMatches}
                </div>
            </div>
        );
    }
}

Matches.propTypes = {
    summoner: PropTypes.string,
    matches: PropTypes.objectOf(Immutable.Map).isRequired,
}

