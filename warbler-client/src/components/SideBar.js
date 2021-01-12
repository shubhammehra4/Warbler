import React from 'react'
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import SideBarOption from './SideBarOption';

function SideBar (props) {
    const logout = e => {
        e.preventDefault();
        props.logout();
    }
    const {username, profileImage} = props.currentUser;
    return (
        <header className="sidebar">
        <div className="align">
            <i className="fab fa-twitter brand selected"></i>
            
            <SideBarOption route="/home" icon="far fa-home" text="Home" />
            <SideBarOption route="/explore" icon="far fa-hashtag" text="Explore" />
            <SideBarOption route="/notifications" icon="far fa-bell" text="Notifications" />                
            <SideBarOption route="/messages" icon="far fa-envelope" text="Messages" />
            <SideBarOption route="/bookmarks" icon="far fa-bookmark" text="Bookmarks" />
            <SideBarOption route="/profile" icon="far fa-user" text="Profile" />
            <SideBarOption route="" icon="far fa-ellipsis-h" text="More" />
            <button className="sidebar__tweet__post" type="button">Tweet</button>
            <div className="user__pill">
                <img src={ profileImage || "https://abs.twimg.com/favicons/twitter.ico" } alt="user"/>
                <div>
                    <h4>Shubham Mehra</h4>
                    <h6 className="text-muted underlined">@{ username }</h6>
                </div>
                <i className="fas fa-ellipsis-v" onClick={ logout }></i>
            </div>
            </div>
        </header>
    )
}


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    };
};

export default connect(mapStateToProps, { logout })(SideBar);