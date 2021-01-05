import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchMessages, removeMessage, likeRequest } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';


class MessageList extends Component {
    componentDidMount() {
        this.props.fetchMessages();
    }
    render() {
        const { messages, removeMessage, currentUser, likeRequest } = this.props;
        let messageList = messages.map(m => (
            <MessageItem 
                key={m._id} 
                date={m.createdAt} 
                text={m.text} 
                likes={m.likesNumber}
                username={m.user.username}
                profileImage={ m.user.profileImage }
                removeMessage={ removeMessage.bind(this, m.user._id, m._id) }
                likeMessage={ likeRequest.bind(this, m.user._id, m._id) }
                isCorrectUser={ currentUser.id ===  m.user._id }
             />
        ))
        return (
            <div className="container-fluid">
                <ul id="messages">
                    {messageList}
                </ul>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        messages: state.messages,
        currentUser: state.currentUser.user
    };
};

export default connect(mapStateToProps, { fetchMessages, removeMessage, likeRequest })(MessageList);