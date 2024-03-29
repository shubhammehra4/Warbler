import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import { ReactTagify } from "react-tagify";
import UserDropdown from './UserDropdown';

const tagStyle = {
    cursor: "pointer",
    color: "#1da1f2"
}

const TweetItem = ({ date, profileImage, username, text, removeMessage, isCorrectUser, likes, likeMessage, unlikeMessage }) => (
    <li className="tweet">
        <span className ="dropdown">
            <img src={profileImage || "https://abs.twimg.com/favicons/twitter.ico"} alt={username} />
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
                    <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                </span>
            </div>
            <div className="tweet__options">
                <i className="far fa-comment" aria-hidden="true"></i>
                <i className="fas fa-share" aria-hidden="true"></i>
                <i className="far fa-heart" onClick={ likeMessage } aria-hidden="true">&nbsp;{likes}</i> 
                { isCorrectUser &&
                    <i className="fas fa-trash" onClick={ removeMessage } aria-hidden="true"></i>
                }
            </div>
        </div>
    </li>
);

export default TweetItem;