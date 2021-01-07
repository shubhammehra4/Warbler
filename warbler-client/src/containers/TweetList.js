import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchMessages, removeMessage, likeRequest, unlikeRequest } from '../store/actions/messages';
import TweetItem from '../components/TweetItem';


class TweetList extends Component {
    componentDidMount() {
        this.props.fetchMessages();
    }
    render() {
        const { messages, removeMessage, currentUser, likeRequest, unlikeRequest } = this.props;
        let messageList = messages.map(m => (
            <TweetItem 
                key={m._id} 
                date={m.createdAt} 
                text={m.text} 
                likes={m.likesNumber}
                username={m.user.username}
                profileImage={ m.user.profileImage }
                removeMessage={ removeMessage.bind(this, m.user._id, m._id) }
                likeMessage={ likeRequest.bind(this, m.user._id, m._id) }
                unlikeMessage={ unlikeRequest.bind(this, m.user._id, m._id) }
                isCorrectUser={ currentUser.id ===  m.user._id }
             />
        ))
        return (
            <div className="tweetList">
                <ul id="tweets">
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

export default connect(mapStateToProps, { fetchMessages, removeMessage, likeRequest, unlikeRequest })(TweetList);