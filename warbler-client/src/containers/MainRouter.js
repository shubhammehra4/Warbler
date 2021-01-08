import React from 'react';
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Feed from "../components/Feed";
import AuthForm from '../components/AuthForm';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import SideBar from '../components/SideBar';
import NewsFeed from '../components/NewsFeed';


const MainRouter = (props) => {
    const { authUser, errors, removeError, currentUser } = props;
    return (
        <Switch >
            <Route exact path="/">
                {currentUser.isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/auth" />}
            </Route>
            <Route exact path="/home" >
                {currentUser.isAuthenticated ?
                    <div className="app">
                        <SideBar /> <Feed currentUser={currentUser} {...props} /> <NewsFeed />
                    </div>
                    :
                    <Redirect to="/auth" />
                }
            </Route>
            <Route exact path="/explore">
                {currentUser.isAuthenticated ?
                    <div className="home-page">
                        <SideBar /> <span style={{width:"50%"}}> Explore </span> <NewsFeed />
                    </div>
                    :
                    <Redirect to="/auth" />
                }
            </Route>
            {/* <Route exact path='/signin'>
            { currentUser.isAuthenticated ? <Redirect to="/home" /> 
                    :   <AuthForm 
                            removeError={removeError} 
                            errors={errors} 
                            onAuth={authUser} 
                            buttonText="Log In" 
                            heading="Welcome Back." 
                        />
                }
            </Route> */}
            {/* render={props => {
                return (
                    <AuthForm 
                        removeError={removeError} 
                        errors={errors} onAuth={authUser} 
                        buttonText="Log In" 
                        heading="Welcome Back." {...props} 
                    />
                );
            }} */}
            <Route exact path='/auth'>
            { currentUser.isAuthenticated ? <Redirect to="/home" /> 
                    :   
                    <AuthForm 
                        removeError={removeError} 
                        errors={errors} 
                        onAuth={authUser} 
                    />
                }
            </Route>
        </Switch>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
};

export default withRouter(connect(mapStateToProps, { authUser, removeError })(MainRouter));