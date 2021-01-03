import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

class Aside extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }
    render() {
        const {username, profileImage} = this.props.currentUser;
        return (
            <aside className="home-aside">
                <spam className="brand">
                    <i class="fa fa-twitter"></i>
                </spam>
                <NavLink exact to="/home" activeClassName="selected">
                    <i class="fa fa-home"></i>&nbsp;
                    <span className="nav-text">Home</span>
                </NavLink>
                <NavLink exact to="/explore" activeClassName="selected">
                    <i class="fa fa-hashtag"></i>&nbsp;
                    <span className="nav-text">Explore</span>
                </NavLink>
                <NavLink exact to="/messages" activeClassName="selected">
                    <i class="fa fa-envelope-o"></i>&nbsp;
                    <span className="nav-text">Messages</span>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="selected">
                    <i class="fa fa-user"></i>&nbsp;
                    <span className="nav-text">Profile</span>
                </NavLink>
                <button className="tweet-post" type="button">Tweet</button>
                <div className="user-pill">
                    <img className="user-pill-image" src={ profileImage || "https://abs.twimg.com/favicons/twitter.ico" } alt="user"/>
                    <div className="user-pill-user">
                        <h3>Shubham Mehra</h3>
                        <h6 className="text-muted underlined">@{ username }</h6>
                    </div>
                    <button onClick={ this.logout }>Log Out</button>
                </div>
            </aside>
        )
    }
}


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    };
};

export default connect(mapStateToProps, { logout })(Aside);