import React from 'react';
import MessageList from '../containers/MessageList';
import MessageForm from '../containers/MessageForm';

const MessageTimeLine = ({profileImage, username}) => {
    return (
        <div className="row">
            <MessageForm profileImage={profileImage} username={username} />
            <MessageList />
        </div>
    );
}

export default MessageTimeLine;