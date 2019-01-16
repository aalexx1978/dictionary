import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import toJson from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });
import configureStore from "redux-mock-store";

import Header from "../../components/Header";
describe("<Header />", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = shallow(<Header />);
            const component = wrapper.dive();

            expect(toJson(component)).toMatchSnapshot();
        });
    });
});
