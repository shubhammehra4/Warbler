import React, { useState } from 'react';

const NewsFeed = () => {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };
    return (
        <div className="news__feed">
            <h4>Feed</h4>
            <div className="new-1">
                This is news
            </div>
            <div className={isActive ? 'sidebar__tweet__post ld-ext-right running': 'sidebar__tweet__post ld-ext-right'}  onClick={toggleClass} >
                My Button
            <div className="ld ld-ring ld-spin"></div>
            </div>
        </div>
    );
}

export default NewsFeed;