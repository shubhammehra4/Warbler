import React from 'react';
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Feed from "./home/Feed";
import AuthForm from './auth/AuthForm';
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
                        <SideBar />
                        <main className="main"> <Feed currentUser={currentUser} {...props} />  <NewsFeed /> </main>
                    </div>
                    :
                    <Redirect to="/auth" />
                }
            </Route>
            <Route exact path="/explore">
                {currentUser.isAuthenticated ?
                    <div className="app"> 
                        <SideBar />
                        <main className="main"> <Feed currentUser={currentUser} {...props} />  <NewsFeed /> </main>
                    </div>
                    :
                    <Redirect to="/auth" />
                }
            </Route>
                
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