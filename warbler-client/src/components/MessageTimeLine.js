import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeLine = (props) => {
    return (
        <div className="row">
            <UserAside profileImage={props.profileImage} username={props.username} />
            <MessageList />
        </div>
    );
}

export default MessageTimeLine;