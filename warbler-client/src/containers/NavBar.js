import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className='navbar-brand'>
                            <img src="https://image.flaticon.com/icons/png/512/23/23931.png" alt="Warbler Home"/>
                        </Link>
                    </div>    
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to='/signup'>Sign up</Link>
                        </li>
                        <li>
                            <Link to='/signin'>Log in</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, null)(NavBar);