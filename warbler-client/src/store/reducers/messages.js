import { LOAD_MESSAGES, REMOVE_MESSAGES, NEW_MESSAGE, LIKE_MESSAGE, UNLIKE_MESSAGE } from "../actionTypes";

const messages = (state = [], action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return [...state, ...action.messages.results];
        case NEW_MESSAGE:
            return [action.message, ...state];
        case REMOVE_MESSAGES:
            return state.filter(messages => messages._id !== action.id);
        case LIKE_MESSAGE:
            return state.map(messages => {
                if(messages._id === action.id) {
                    messages.likesNumber+=1
                }
                return messages;
            });
        case UNLIKE_MESSAGE:
            return state.map(messages => {
                if(messages._id === action.id) {
                    messages.likesNumber-=1
                }
                return messages;
            });
        default:
            return state;
    }
}

export default messages;