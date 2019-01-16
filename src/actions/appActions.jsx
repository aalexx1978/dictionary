import axios from "axios";
import {
    RECEIVE_PRODUCTS,
    RECEIVE_DICTIONARIES,
    ERROR,
    SET_DICTIONARY
} from "./allActions";

const headers = { "Content-Type": "application/json" };
export function receiveProducts(data) {
    return { type: RECEIVE_PRODUCTS, products: data };
}
export function receiveDictionaries(data) {
    return { type: RECEIVE_DICTIONARIES, dictionaries: data };
}
export function isError(errorValue) {
    return { type: ERROR, error: errorValue };
}

export function setDictionary(value) {
    return { type: SET_DICTIONARY, dictionary: value };
}

export function fetchProducts() {
    return dispatch => {
        axios
            .get("/products")
            .then(function(response) {
                dispatch(receiveProducts(response.data));
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}
export function addProduct(data) {
    let content = {
        product: "Sony X",
        color: "Mystic Silver",
        price: 772
    };
    return dispatch => {
        axios
            .post("/products", content, headers)
            .then(function(response) {
                dispatch(fetchProducts());
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}
export function addDictionary(data) {
    let content = {
        name: "New Dictionary",
        Stonegrey: "Dark",
        "Midnight Black": "Black Dark",
        "Mystic Silver": "Silver Special"
    };
    return dispatch => {
        axios
            .post("/dictionaries", content, headers)
            .then(function(response) {
                dispatch(fetchDictionaries());
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}
export function removeDictionary(id) {
    return dispatch => {
        axios
            .delete("/dictionaries/" + id)
            .then(function(response) {
                dispatch(fetchDictionaries());
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}
export function removeProduct(id) {
    return dispatch => {
        axios
            .delete("/products/" + id)
            .then(function(response) {
                dispatch(fetchProducts());
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}

export function updateDictionary(dic) {
    return dispatch => {
        axios
            .put("/dictionaries/" + dic.id, dic, headers)
            .then(function(response) {
                dispatch(fetchDictionaries());
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}
export function fetchDictionaries() {
    return dispatch => {
        axios
            .get("/dictionaries")
            .then(function(response) {
                dispatch(receiveDictionaries(response.data));
            })
            .catch(function(error) {
                dispatch(isError(error.message));
                setTimeout(() => {
                    dispatch(isError(null));
                }, 4500);
            });
    };
}
