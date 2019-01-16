import initialState from "./initialState";
import {
    FETCH_DATA,
    RECEIVE_PRODUCTS,
    RECEIVE_DICTIONARIES,
    ERROR,
    SET_DICTIONARY
} from "../actions/allActions";

export default function appRed(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state };
        case RECEIVE_PRODUCTS:
            return { ...state, products: action.products };
        case RECEIVE_DICTIONARIES:
            return { ...state, dictionaries: action.dictionaries };
        case ERROR:
            return { ...state, error: action.error };
        case SET_DICTIONARY:
            return { ...state, dictionary: action.dictionary };
        default:
            return state;
    }
}
