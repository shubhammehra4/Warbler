import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';

const TweetItem = ({ date, profileImage, username, text, removeMessage, isCorrectUser, likes, likeMessage, unlikeMessage }) => (
    <li className="tweet">
        <img src={profileImage || "https://abs.twimg.com/favicons/twitter.ico"} alt={username} />
    
        <div className="tweet__area">
            <div className="tweet__body">
                <div>
                    <Link to="/">{ username }</Link> &nbsp;
                    <Link to="/" className="text-muted">@{ username } &nbsp;</Link>
                    <span className="text-muted">
                        {formatDistance(new Date(date), new Date())}
                    </span>
                    <p className="tweet__text">{text}</p>
                </div>
            
                <span>
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </span>
            </div>
            <div className="tweet__options">
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                <i className="fa fa-heart-o" onClick={ likeMessage } aria-hidden="true">&nbsp;{likes}</i> 
                { isCorrectUser &&
                    <i className="fa fa-trash-o" onClick={ removeMessage } aria-hidden="true"></i>
                }
            </div>
        </div>
    </li>
);

export default TweetItem;