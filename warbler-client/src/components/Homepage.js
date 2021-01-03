import React from 'react';
import MessageForm from '..//containers/MessageForm';
import MessageList from '../containers/MessageList';
// import MessageTimeLine from './MessageTimeLine';

const Homepage = ({currentUser}) => {
    return (
        <div className="message">
            <div className="header">
                <h2>Home</h2>
            </div>
            <MessageForm profileImage={currentUser.user.profileImage} username={currentUser.user.username} />
            <MessageList />
        </div>
    );
    
};

export default Homepage;