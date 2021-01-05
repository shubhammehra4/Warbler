import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MessageItem = ({ date, profileImage, username, text, removeMessage, isCorrectUser, likes, likeMessage, unlikeMessage }) => (
    <li className="tweet">
        <div className="tweet-item">
            <img src={profileImage || "https://abs.twimg.com/favicons/twitter.ico"} alt={username} />
            <div className="tweet-area">
                <Link to="/">*NAME*</Link> &nbsp;
                <Link to="/" className="text-muted">@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment startof="day" fromNow>
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
            </div>
            
            <span>
                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </span>
        </div>
        
        <div className="tweet-options">
            <i className="fa fa-comment-o" aria-hidden="true"></i>
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            <i className="fa fa-heart-o" onClick={ likeMessage } aria-hidden="true">&nbsp;{likes}</i> 
            { isCorrectUser &&
                <i className="fa fa-trash-o" onClick={ removeMessage } aria-hidden="true"></i>
            }
        </div>
    </li>
);

export default MessageItem;