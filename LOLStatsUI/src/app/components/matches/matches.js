import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import Match from "./match";

export default class Matches extends Component {
    render() {
        const { summoner, matches } = this.props;

        let jsxMatches = [];
        const matchList = matches.get("matches");
        if (matchList) {
            matchList.map(match => {
                jsxMatches.push(
                    <Match key={match.get("gameId")} match={match} />
                );
            });
        }

        return (
            <div className="matches">
                <div className="matches_summoner">
                    {summoner}
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

