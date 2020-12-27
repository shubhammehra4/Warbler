import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeLine from './MessageTimeLine';

const Homepage = ({currentUser}) => {
    if(!currentUser.isAuthenticated){
        return (
            <div className='home-hero'>
                <h1>What's Happening?</h1>
                <h4>New to Warbler?</h4>
                <Link to='/signup' className='btn btn-primary'>Sign Up Here!</Link>
            </div>
        );
    } else {
        return(
            <MessageTimeLine profileImage={currentUser.user.profileImage} username={currentUser.user.username} />
        );
    }
    
};

export default Homepage;