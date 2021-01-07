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
    // render() {
    //     const {username, profileImage} = this.props.currentUser;
        return (
            <aside className="sidebar">
                {/* TWITTER ICON */}
                <i className="fa fa-twitter brand"></i>
                
                <SideBarOption route="/home" icon="fa fa-home" text="Home" />
                <SideBarOption route="/explore" icon="fa fa-hashtag" text="Explore" />
                <SideBarOption route="/notifications" icon="fa fa-bell" text="Notifications" />                
                <SideBarOption route="/messages" icon="fa fa-envelope-o" text="Messages" />
                {/* <NavLink exact to="/home" activeClassName="selected">
                    <i className="fa fa-home"></i>&nbsp;
                    <span className="nav-text">Home</span>
                </NavLink>
                <NavLink exact to="/explore" activeClassName="selected">
                    <i className="fa fa-hashtag"></i>&nbsp;
                    <span className="nav-text">Explore</span>
                </NavLink>
                <NavLink exact to="/messages" activeClassName="selected">
                    <i className="fa fa-envelope-o"></i>&nbsp;
                    <span className="nav-text">Messages</span>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="selected">
                    <i className="fa fa-user"></i>&nbsp;
                    <span className="nav-text">Profile</span>
                </NavLink> */}
                <button className="sidebar__tweet__post" type="button">Tweet</button>
                <div className="sidebar__user__pill">
                    <img className="user__pill__image" src={ profileImage || "https://abs.twimg.com/favicons/twitter.ico" } alt="user"/>
                    <div className="user__pill__user">
                        <h4>Shubham Mehra</h4>
                        <h6 className="text-muted underlined">@{ username }</h6>
                    </div>
                    <i className="fa fa-ellipsis-h"></i>
                    {/* <button onClick={ logout }>Log Out</button> */}
                </div>
            </aside>
        )
    // }
}


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    };
};

export default connect(mapStateToProps, { logout })(SideBar);