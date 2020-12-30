import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MessageItem = ({ date, profileImage, username, text, removeMessage, isCorrectUser }) => (
    
    <li className="message-item">
        <div className="row">
            <div className="col col-xl-2">
                <img src={profileImage} alt={username} height="100" width="100" className="message-author-image" />
            </div>
            <div className="col col-sm-7 col-md-8 col-lg-9 col-xl-9 p-0">
                <div className="message-area">
                    <Link to="/" className="message-author-name">*NAME*</Link> &nbsp;
                    <Link to='/' className="message-author-username text-muted">@{username} &nbsp;</Link>
                    <span className="text-muted">
                        <Moment startOf="day" fromNow>
                            {date}
                        </Moment>
                    </span>
                    <p className="message-content">{text}</p>
                </div>
            </div>
            
            <span className="pull-right pr-3">
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
            </span>
        </div>
        
        <div className="row message-options">
            <i class="fa fa-comment-o p-2" aria-hidden="true"></i>
            <i class="fa fa-paper-plane-o p-2" aria-hidden="true"></i>
            <i class="fa fa-heart-o p-2" aria-hidden="true"></i>
            { isCorrectUser &&
                <i class="fa fa-trash-o p-2" onClick={ removeMessage } aria-hidden="true"></i>
            }
        </div>
    </li>
);

export default MessageItem;