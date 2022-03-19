import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS } from "../constants/productConstants.js";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async(dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });


        let link = `http://localhost:4000/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (keyword.length) { link += `&keyword=${keyword}`; }
        if (category) { link += `&category=${category}`; }

        const res = await fetch(link);
        const data = await res.json();

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = function(id) {
    return async function(dispatch) {
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            });

            const res = await fetch(`http://localhost:4000/api/v1/product/${id}`);
            const data = await res.json();

            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product
            });
        } catch(error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

// Clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}