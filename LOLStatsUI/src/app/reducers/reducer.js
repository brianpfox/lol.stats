import { combineReducers} from "redux-immutable";
import Immutable from "immutable";
import { INITIALIZE_REQUEST, INITIALIZE_RECEIVED} from "../actions/actions";

const initialState = Immutable.Map({
    isFetching: false,
    username: "",
    csrf: "",
});

function mainState(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_REQUEST:
            state = state.set("isFetching", true);
            return state;

        case INITIALIZE_RECEIVED:
            state = state.set("isFetching", false);
            state = state.set("username", action.username);
            state = state.set("csrf", action.csrf);
            return state.set("version", action.version);

        default:
            return state;
   }
}

const rootReducer = combineReducers({
    mainState
});

export default rootReducer;
