import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Search extends Component {
    onSearchTextChange(evt) {
        const {onSearchTextChange} = this.props;
        onSearchTextChange(evt.target.value);
    }

    render() {
        const {isFetching, searchText, onSearch} = this.props;

        let jsxFetching = isFetching ? (
            <div>FETCHING</div>
        ) : "";
        return (
            <div className="search">
                <input type="text" 
                    text={searchText} 
                    placeholder="Search for Summoner"
                    onChange={this.onSearchTextChange.bind(this)}
                />
                <button onClick={onSearch}>Search</button>
                {jsxFetching}
                BFY%20Meowington
            </div>
        );
    }
}

Search.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    searchText: PropTypes.string,
    onSearchTextChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};
