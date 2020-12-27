import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MessageItem = ({ date, profileImage, username, text }) => (
    <div>
        <li className="list-group-item">
            <img src={profileImage} alt={username} height="100" width="100" className="timeline-image" />
            <div className="message-area">
                <Link to='/'>@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="DD/MM/YYYY">
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
            </div>
        </li>
    </div>
);

export default MessageItem;