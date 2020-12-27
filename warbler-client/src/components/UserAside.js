import React from 'react';

function UserAside({profileImage, username}) {
    return (
        <aside className="col-sm-2">
            <div className="panel panel-default">
                <div className="panel-body">
                    <img 
                        src={profileImage} 
                        alt={username} 
                        className="img-thumbnail" 
                        width="200"
                        height="200"
                    />
                    <h5 className="text-center">@{username}</h5>
                </div>
            </div>
        </aside>
    );
}

export default UserAside;