import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./search.css";

export default class Search extends Component {
    onSearchTextChange(evt) {
        const {onSearchTextChange} = this.props;
        onSearchTextChange(evt.target.value);
    }

    render() {
        const {isFetching, searchText, onSearch} = this.props;

        let jsxFetching = isFetching ? (
            <span>spin</span>
        ) : "";
        return (
            <div className="search">
                <div className="search_searchControls">
                    <input className="search_searchControls_input" type="text" 
                        autoFocus
                        text={searchText} 
                        placeholder="Search for Summoner"
                        onChange={this.onSearchTextChange.bind(this)}
                    />
                    <button className="search_searchControls_button" onClick={onSearch}>Go</button>
                    {jsxFetching}
                </div>
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
