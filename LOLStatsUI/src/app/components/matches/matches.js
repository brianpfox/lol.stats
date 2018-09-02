import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import Match from "./match";

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

        let jsxSummoner = summoner ? `${summoner}'s last 5 games` : "";

        return (
            <div className="matches">
                <div className="matches_summoner">
                    {jsxSummoner}
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

