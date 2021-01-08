import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import ReactHashtag from "react-hashtag";

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
                    {/* <p className="tweet__text">{text}</p> */}
                    <p>
                        <ReactHashtag
                        renderHashtag={(hashtagValue) => (
                            <span className="tweet--hashtag">{hashtagValue}</span>
                        )}>
                        { text }
                        </ReactHashtag>
                    </p>
                </div>
            
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