import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import { ReactTagify } from "react-tagify";
import UserDropdown from './UserDropdown';

const tagStyle = {
    cursor: "pointer",
    color: "#1da1f2"
}

const TweetItem = React.forwardRef(({ date, profileImage, username, text, removeMessage, isCorrectUser, likes, likeMessage, unlikeMessage }, ref) => (
    <li className="tweet" ref={ref}>
        <span className ="dropdown">
            <img src={profileImage || "https://images.unsplash.com/profile-1601277045639-93845dc02dd2image"} alt={username} />
            <UserDropdown profileImage={profileImage} username={username} />
        </span>
        <div className="tweet__area">
            <div className="tweet__body">
                <section>
                    <Link to="/">{ username }</Link> &nbsp;
                    <Link to="/" className="text-muted">@{ username } &nbsp;</Link>
                    <span className="text-muted">
                        {formatDistance(new Date(date), new Date())}
                    </span>
                    <p>
                        <ReactTagify className="hello" tagStyle={tagStyle} mentionStyle={tagStyle} detectLinks>
                            { text }
                        </ReactTagify>
                    </p>
                </section>
            
                <span>
                    { isCorrectUser ?
                        <i className="fas fa-trash" onClick={ removeMessage } aria-hidden="true"></i>
                    : 
                        <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                    }
                </span>
            </div>
            <div className="tweet__options">
                <i className="far fa-comment" aria-hidden="true"></i>
                <i class="fas fa-retweet"></i>
                <i className="far fa-heart" onClick={ likeMessage } aria-hidden="true">&nbsp;{likes}</i> 
                <i className="fas fa-share" aria-hidden="true"></i>
            </div>
        </div>
    </li>
));

export default TweetItem;