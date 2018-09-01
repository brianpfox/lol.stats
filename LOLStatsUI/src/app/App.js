import React, { Component } from "react";
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from "react-redux";
import { Actions } from './actions/actions';
import "./app.css";
import Title from "./components/title/title";
import Search from "./components/search/search";
import Matches from "./components/matches/matches";
import Footer from "./components/footer/footer";

class App extends Component {
    componentWillMount() {
        this.actions = new Actions();
    }

    onSearchTextChange(value) {
        const { dispatch } = this.props;
        dispatch(this.actions.searchTextChange(value));
    }

    onSearch() {
        const { dispatch } = this.props;
        dispatch(this.actions.search());
    }

    render() {
        const {isFetching, searchText, summoner, matches} = this.props;
        return (
            <div className="appWrap">
                <div className="titleWrap">
                    <Title />
                </div>
                <div className="searchWrap">
                    <Search 
                        isFetching={isFetching} 
                        searchText={searchText} 
                        onSearchTextChange={this.onSearchTextChange.bind(this)}
                        onSearch={this.onSearch.bind(this)}
                    />
                </div>
                <div className="bodyWrap">
                    <Matches
                        summoner={summoner}
                        matches={matches}
                    />
                </div>
                <div className="footerWrap">
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let sp = state.get("mainState");
    return {
        isFetching: sp.get("isFetching"),
        searchText: sp.get("searchText"),
        summoner: sp.get("summoner"),
        matches: sp.get("matches")
    };
}

export default connect(mapStateToProps)(App);

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
    summoner: PropTypes.string.isRequired,
    matches: PropTypes.objectOf(Immutable.Map).isRequired,
}