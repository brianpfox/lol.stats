import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import moment from 'moment';

export default class Match extends Component {
    constructor(props) {
        super(props);
        moment.updateLocale('en', {
            calendar : {
                lastDay : '[Yesterday at] LT',
                sameDay : '[Today at] LT',
                nextDay : '[Tomorrow at] LT',
                lastWeek : '[last] dddd [at] LT',
                nextWeek : 'dddd [at] LT',
                sameElse : 'L [at] LT'
            }
        });
    }   

    _formatDate(value) {
        return moment(value).calendar();
    }

    _formatDuration(value) {
        return Math.round(moment.duration(value, "seconds").asMinutes()*100)/100;
    }

    render() {
        const { match } = this.props;
        // console.log(match.toJS());
        return (
            <div className="matches_list_match">
                <div>Timestamp: {this._formatDate(match.get("timestamp"))}</div>
                <div>Champion: {match.get("champion")}</div>
                <div>Game Duration: {this._formatDuration( match.get("matchDetail").get("gameDuration"))} minutes</div>
            </div>
        );
    }
}

Match.propTypes = {
    match: PropTypes.objectOf(Immutable.Map).isRequired,
}