import React from 'react'
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from '../components/AuthForm';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import Aside from '../components/Aside';
import NewsFeed from '../components/NewsFeed';


const MainRouter = (props) => {
    const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container">
            <Switch >
                <Route exact path="/">
                    {currentUser.isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/signin" />}
                </Route>
                <Route exact path="/home" >
                    {currentUser.isAuthenticated ?
                        <div className="home-page">
                            <Aside /> <Homepage currentUser={currentUser} {...props} /> <NewsFeed />
                        </div>
                        :
                        <Redirect to="/signin" />
                    }
                </Route>
                <Route exact path="/explore">
                    {currentUser.isAuthenticated ?
                        <div className="home-page">
                            <Aside /> <span style={{width:"50%"}}> Explore </span> <NewsFeed />
                        </div>
                        :
                        <Redirect to="/signin" />
                    }
                </Route>
                {/* <Route exact path='/' render={ props => 
          { if(currentUser.isAuthenticated) {
              <div className="home-page">
                <Aside/> <Homepage currentUser={ currentUser } {...props} /> <NewsFeed />
              </div>
            } else {
              <div className='home-hero'>
                  <h1>What's Happening?</h1>
                  <h4>New to Warbler?</h4>
                  <Link to='/signup' className='btn btn-primary'>Sign Up Here!</Link><br/>
                  <Link to='/signin' className='btn btn-primary'>Log In Here!</Link>
              </div>
            }
          }
        } /> */}

                {/* <Route exact path="/explore" component= /> */}

                <Route exact path='/signin' render={props => {
                    return (
                        <AuthForm 
                            removeError={removeError} 
                            errors={errors} onAuth={authUser} 
                            buttonText="Log In" 
                            heading="Welcome Back." {...props} 
                        />
                    );
                }}
                />
                <Route exact path='/signup' render={props => {
                    return (
                        <AuthForm 
                            signup 
                            removeError={removeError} 
                            errors={errors} 
                            onAuth={authUser} 
                            buttonText="Sign Up" 
                            heading="Join Warbler Today." {...props} 
                        />
                    );
                }}
                />
            </Switch>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
};

export default withRouter(connect(mapStateToProps, { authUser, removeError })(MainRouter));