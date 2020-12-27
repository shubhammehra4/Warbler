import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES } from "../actionTypes";


export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const fetchMessages = () => {
    return dispatch => {
        return apiCall("GET", "/api/messages")
            .then(res => {
                dispatch(loadMessages(res))
            })
            .catch(err => {
                addError(err.message)
            });
    };
};