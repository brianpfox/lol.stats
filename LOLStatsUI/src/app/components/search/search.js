import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./search.css";
import 'font-awesome/css/font-awesome.min.css';

export default class Search extends Component {
    onSearchTextChange(evt) {
        const {onSearchTextChange} = this.props;
        onSearchTextChange(evt.target.value);
    }

    render() {
        const {isFetching, searchText, onSearch} = this.props;

        const buttonCls = `search_searchControls_button fa ${isFetching ? "fa-refresh fa-spin" : "fa-search"}`;

        return (
            <div className="search">
                <div className="search_searchControls">
                    <input className="search_searchControls_input" type="text" 
                        autoFocus
                        text={searchText} 
                        placeholder="Search for Summoner"
                        onChange={this.onSearchTextChange.bind(this)}
                    />
                    <button className={buttonCls} onClick={onSearch}></button>
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
