import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from "./errors";

export function setCurrenUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
};

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false)
        dispatch(setCurrenUser({}));
    }
};


export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrenUser(user));
                    dispatch(removeError);
                    resolve();
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                })
        });
    };
}