import { combineReducers} from "redux-immutable";
import Immutable from "immutable";
import { actions } from "../actions/actions";

const initialState = Immutable.Map({
    isFetching: false,
    searchText: "BFY%20Meowington",
    summoner: "",
    matches: Immutable.Map(),
});

function mainState(state = initialState, action) {
    switch (action.type) {
        case actions.SEARCH_TEXT_CHANGE:
            return state.set("searchText", action.searchText)

        case actions.SEARCH_REQUEST:
            state = state.set("isFetching", true);
            return state;

        case actions.SEARCH_RECEIVED:
            state = state.set("isFetching", false);
            state = state.set("summoner", state.get("searchText"))
            return state.set("matches", action.matches);

        default:
            return state;
   }
}

const rootReducer = combineReducers({
    mainState
});

export default rootReducer;
