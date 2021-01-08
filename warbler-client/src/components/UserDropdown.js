import React from 'react'

function UserDropdown({profileImage, username}) {
    return (
        <div className="dropdown-content">
            <div className="user__dropdown">
                <img src={profileImage || "https://abs.twimg.com/favicons/twitter.ico"} alt={username} />
                <button className="tweet__post">Follow</button>
            </div>
            <div className="user__dropdown__options">
                <a href="/">{ username }</a>
                <a href="/" className="text-muted">@{ username } &nbsp;</a>
            </div>
        </div>
    );
}

export default UserDropdown
