import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS,
    REGISTER_USER_REQUEST, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST, LOAD_USER_FAIL, LOAD_USER_SUCCESS, CLEAR_ERRORS } from "../constants/userConstants.js";

// Login
export const login = (email, password) => async function(dispatch) {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const response = await fetch("http://localhost:4000/api/v1/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });
        const data = await response.json();

        if (data && data.success)
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        else
            dispatch({ type: LOGIN_FAIL, payload: data.message });

    } catch(error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}

// Register
export const register = userData => async function(dispatch) {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        console.log(userData);

        const response = await fetch("http://localhost:4000/api/v1/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include"
        });
        const data = await response.json();

        if (data && data.success)
            dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        else
            dispatch({ type: REGISTER_USER_FAIL, payload: data.message });

    } catch(error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}

// Loaduser
export const loadUser = () => async function(dispatch) {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const response = await fetch("http://localhost:4000/api/v1/me");
        const data = await response.json();
        console.log(response.status, data);

        if (data && data.success)
            dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        else
            dispatch({ type: LOAD_USER_FAIL, payload: data.message });

    } catch(error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}

// Clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}