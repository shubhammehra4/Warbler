import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGES, NEW_MESSAGE, LIKE_MESSAGE, UNLIKE_MESSAGE } from "../actionTypes";


export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const remove = id => {
    return {
        type: REMOVE_MESSAGES,
        id
    };
};

export const newMessage = message => {
    return {
        type: NEW_MESSAGE,
        message
    }
}

export const likeMessage = id => {
    return {
        type: LIKE_MESSAGE,
        id
    }
}

export const unlikeMessage = id => {
    return {
        type: UNLIKE_MESSAGE,
        id
    }
}

export const fetchMessages = (page) => {
    return dispatch => {
        console.log("sent redux");
        return apiCall("GET", `/api/messages?page=${page}`)
            .then(res => {
                dispatch(loadMessages(res))
                return res.hasMore;
            })
            .catch(err => dispatch(addError(err.message)));
    };
};

export const postNewMessage = (text) => (dispatch, getSate) => {
    let { currentUser } = getSate();
    let id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages`, {text})
        .then(res => dispatch(newMessage(res)))
        .catch(err => dispatch(addError(err.message)))
};

export const removeMessage = (user_id, message_id) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
            .then(() => dispatch(remove(message_id)))
            .catch(err => dispatch(addError(err.message)));
    }
}

export const likeRequest = (user_id, message_id) => {
    return dispatch => {
        return apiCall("post", `/api/users/${user_id}/messages/${message_id}/like`)
            .then((res) => {
                console.log(res);
                if(res.like==="Successful") {
                    dispatch(likeMessage(message_id));
                }
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export const unlikeRequest = (user_id, message_id) => {
    return dispatch => {
        return apiCall("post", `/api/users/${user_id}/messages/${message_id}/unlike`)
            .then((res) => {
                console.log(res);
                if(res.unlike==="Successful") {
                    dispatch(unlikeMessage(message_id));
                }
            })
            .catch(err => dispatch(addError(err.message)));
    }
}