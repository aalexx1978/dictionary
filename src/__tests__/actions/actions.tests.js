import configureMockStore from "redux-mock-store";
import { Thunk } from "redux-testkit";
import fetchMock from "fetch-mock";

import * as actions from "../../actions/appActions";
import * as constants from "../../actions/allActions";

describe("App Actions", () => {
    it("Receive products", () => {
        const action = actions.receiveProducts({});
        expect(action).toEqual({
            type: constants.RECEIVE_PRODUCTS,
            products: {}
        });
    });
    it("Receive Dictionaries", () => {
        const action = actions.receiveDictionaries({});
        expect(action).toEqual({
            type: constants.RECEIVE_DICTIONARIES,
            dictionaries: {}
        });
    });
    it("reports error", () => {
        const action = actions.isError("Error");
        expect(action).toEqual({
            type: constants.ERROR,
            error: "Error"
        });
    });
    it("set Dictionary", () => {
        const action = actions.setDictionary(0);
        expect(action).toEqual({
            type: constants.SET_DICTIONARY,
            dictionary: 0
        });
    });
});

describe("async actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("fetch products", async () => {
        const dispatches = await Thunk(actions.fetchProducts).execute();
        expect(dispatches.length).toBe(0);
    });
});
