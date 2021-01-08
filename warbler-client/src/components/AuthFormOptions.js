import React from 'react'

function AuthFormOptions() {
    return ([
            <p className="social-text">Or Sign up with these social platforms</p>,
            <div className="social-media">
                <a href="/" className="social-icon">
                    <i className="fa fa-facebook-f"></i>
                </a>
                <a href="/" className="social-icon">
                    <i className="fa fa-twitter"></i>
                </a>
                <a href="/" className="social-icon">
                    <i className="fa fa-google"></i>
                </a>
            </div>]
    )
}

export default AuthFormOptions
