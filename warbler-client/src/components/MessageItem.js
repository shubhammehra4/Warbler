import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MessageItem = ({ date, profileImage, username, text, removeMessage, isCorrectUser }) => (
    <li className="tweet">
        <div className="tweet-item">
            <img src={profileImage} alt={username} />
            <div className="tweet-area">
                <Link to="/">*NAME*</Link> &nbsp;
                <Link to="/" className="text-muted">@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment startOf="day" fromNow>
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
            </div>
            
            <span>
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
            </span>
        </div>
        
        <div className="tweet-options">
            <i class="fa fa-comment-o" aria-hidden="true"></i>
            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            { isCorrectUser &&
                <i class="fa fa-trash-o" onClick={ removeMessage } aria-hidden="true"></i>
            }
        </div>
    </li>
);

export default MessageItem;