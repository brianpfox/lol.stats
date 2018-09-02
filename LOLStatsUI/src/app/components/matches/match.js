import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

export default class Match extends Component {
    render() {
        const { match } = this.props;
        // console.log(match.toJS());
        return (
            <div>
                <div>Timestamp: {match.get("timestamp")}</div>
                <div>Champion: {match.get("champion")}</div>
                <div>Game Duration: {match.get("matchDetail").get("gameDuration")}</div>
            </div>
        );
    }
}

Match.propTypes = {
    match: PropTypes.objectOf(Immutable.Map).isRequired,
}