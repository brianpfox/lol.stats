import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/reducer";
import App from "./App";

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== "production") {
    const logger = createLogger();
    middlewares.push(logger);
}

let store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

export default class AppRoot extends Component {
    render() {
        return (
            <Provider store = {store}>
                <App />
            </Provider>
        );
    }
}
