import React from "react";
import Enzyme from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import initialState from "../../reducers/initialState";

import * as actions from "../../actions/appActions";
import ConnectedApp, { App } from "../../components/App";

Enzyme.configure({ adapter: new Adapter() });
describe(">>>APP --- Snapshot", () => {
    it("+++capturing Snapshot of App", () => {
        const renderedValue = renderer
            .create(<App {...initialState} appActions={actions} />)
            .toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});
