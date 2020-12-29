import { LOAD_MESSAGES, REMOVE_MESSAGES, NEW_MESSAGE } from "../actionTypes";

const messages = (state = [], action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case NEW_MESSAGE:
            return [action.message, ...state];
        case REMOVE_MESSAGES:
            return state.filter(messages => messages._id !== action.id);
        default:
            return state;
    }
}

export default messages;