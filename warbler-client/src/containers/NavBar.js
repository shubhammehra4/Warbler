import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

class NavBar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }
    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className='navbar-brand'>
                            <img src="https://image.flaticon.com/icons/png/512/23/23931.png" alt="Warbler Home"/>
                        </Link>
                    </div>   
                    { this.props.currentUser.isAuthenticated ? (
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <button className="anchor-btn" onClick={ this.logout }>Log out</button>
                            </li>
                        </ul>
                     ) : ( 
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to='/signup'>Sign up</Link>
                            </li>
                            <li>
                                <Link to='/signin'>Log in</Link>
                            </li>
                        </ul>
                     )
                    } 
                </div>
            </nav>
        );
    };
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser 
    };
};

export default connect(mapStateToProps, { logout })(NavBar);