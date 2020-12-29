import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MessageItem = ({ date, profileImage, username, text, removeMessage, isCorrectUser }) => (
    <div>
        <li className="message-item">
            <img src={profileImage} alt={username} height="100" width="100" className="message-author-image" />
            <div className="message-area">
                <Link to="/" className="message-author-name">*NAME*</Link> &nbsp;
                <Link to='/' className="message-author-username text-muted">@{username} &nbsp;</Link>
                <span className="text-mute">
                    <Moment format="DD/MM/YYYY">
                        {date}
                    </Moment>
                </span>
                <p className="message-content">{text}</p>
                <div className="message-options">
                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                    {isCorrectUser &&
                        <i class="fa fa-trash-o" onClick={ removeMessage } aria-hidden="true"></i>
                    }
                </div>
                
            </div>
        </li>
    </div>
);

export default MessageItem;