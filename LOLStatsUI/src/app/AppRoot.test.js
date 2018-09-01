"use strict";

import React from 'react';
import renderer from "react-test-renderer";
import AppRoot from './AppRoot';

it('renders without crashing', () => {
    const app = renderer.create(<AppRoot></AppRoot>).toJSON();
    expect(app).toMatchSnapshot();
});
