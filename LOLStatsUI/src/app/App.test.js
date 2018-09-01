"use strict";

import React from "react";
import Immutable from "immutable";
import { createStore } from "redux";
import App from "./App";
import renderer from "react-test-renderer";

test("renders without crashing", () => {
    let initialState = Immutable.Map({
        isFetching: false,
        username: "",
        csrf: "",
    });

    const mockReducer = () => {
        return {
            get: () => initialState
        };
    };

    let store = createStore(
        mockReducer
    );
    const app = renderer.create(<App store={store}></App>).toJSON();
    expect(app).toMatchSnapshot();
});
