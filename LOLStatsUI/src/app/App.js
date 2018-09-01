import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="appWrap">
                <div className="header">Title</div>
                <div className="search">Search & Summoner Name</div>
                <div className="body">List of Matches</div>
                <div className="footer">Footer</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let sp = state.get("mainState");
    return {
        isFetching: sp.get("isFetching")
    };
}

export default connect(mapStateToProps)(App);
