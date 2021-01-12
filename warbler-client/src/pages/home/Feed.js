import React from 'react';
import TweetList from './TweetList';
import TweetBox from '../../components/TweetBox';

const Feed = ({currentUser}) => {
    return (
        <div className="feed">
            <h2 className="feed__header">Home</h2>
            <TweetBox profileImage={currentUser.user.profileImage} username={currentUser.user.username} />
            <TweetList />
        </div>
    );
    
};

export default Feed;