import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import toJson from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });
import configureStore from "redux-mock-store";
const dict = [
    {
        name: "Dictionary 3",
        Stonegrey: "Dark",
        "Midnight Black": "Black Dark",
        "Mystic Silver": "Silver Special",
        id: 3
    }
];
const sel = 0;

import SelectDict from "../../components/SelectDict";
describe("<SelectDict />", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = shallow(
                <SelectDict dictionaries={dict} dictionary={sel} />
            );
            const component = wrapper.dive();

            expect(toJson(component)).toMatchSnapshot();
        });
    });
});
