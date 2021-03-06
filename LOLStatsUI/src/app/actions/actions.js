import fetch from "isomorphic-fetch";
import Immutable from 'immutable';

export const actions = {
    SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
    SEARCH_REQUEST: "SEARCH_REQUEST",
    SEARCH_RECEIVED: "SEARCH_RECEIVED"
};

export class Actions {
    searchTextChange(value) {
        return (dispatch) => {
            return dispatch(this._searchTextChange(value));
        };
    }

    search() {
        return (dispatch, getState) => {
            return dispatch(this._search(getState().get("mainState").get("searchText")));
        };
    }

    _searchTextChange(value) {
        return {
            type: actions.SEARCH_TEXT_CHANGE,
            searchText: value
         };
    }

    _searchRequest(searchText) {
        return {
           type: actions.SEARCH_REQUEST,
           searchText: searchText
        };
     }
     
     _searchReceived(error, matches) {
        return {
           type: actions.SEARCH_RECEIVED,
           error: error,
           matches: matches
        };
     }

    _search(searchText) {
        return (dispatch) => {
            dispatch(this._searchRequest());
            
            fetch(`/api/matches?summonerName=${searchText}`)
            .then(response => response.json())
            .then(json => {
                if (json.error)
                    return dispatch(this._searchReceived(json.error));
                else 
                    return dispatch(this._searchReceived(null, Immutable.fromJS(json)));
            });
        };
    }
}
