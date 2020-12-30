import React from 'react';
import MessageList from '../containers/MessageList';
import MessageForm from '../containers/MessageForm';

const MessageTimeLine = ({profileImage, username}) => {
    return (
        <div className="row">
            <div className="col col-sm-4 col-md-3" style={{backgroundColor:"beige"}}></div>
            <div className="col col-sm-8 col-md-7">
            <div className="row">
                <MessageForm profileImage={profileImage} username={username} />
            </div>
            <div className="row">
                <MessageList />
            </div>
            </div>
            <div className="col col-xs-0 col-sm-0 col-md-2" style={{backgroundColor:"beige"}}></div>
        </div>
    );
}

export default MessageTimeLine;