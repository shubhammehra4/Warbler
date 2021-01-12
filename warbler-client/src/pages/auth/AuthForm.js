import React, { Component } from 'react';
import AuthFormOptions from './AuthFormOptions';
import signin from '../../images/signin.svg';
import signup from '../../images/signup.svg';
import '../../styles/authform.css';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmpassword:"",
            auth: "signup",
            active: false
        };
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.removeError();
        // const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(e.target.id, this.state)
            .then(() => {
                this.props.history.push("/home");
            })
            .catch(() => {
                return;
            });
    };
    handleSign = (e) => {
        e.preventDefault();
        this.setState({auth: e.target.id})
        console.log(e.target.id);
    }

    handleActive = (e) => {
        this.setState((prevState) => ({active: !prevState.active}));
    }

    render() {
        const { email, username, auth, active } = this.state;
        // const { errors } = this.props;

        return (
            <div className={ auth==="signup"? "container sign-up-mode": "container sign-in-mode"}>
            {/* {console.log(errors)} */}
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={ this.handleSubmit } id="signin" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                            <i className="fas fa-envelope"></i>
                                <input type="email" 
                                    placeholder="Email"
                                    name="email" id="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" 
                                    placeholder="Password"
                                    name="password" id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button type="submit" onClick={ this.handleActive } className={ active? " btn solid ld-ext-right running": "btn solid"}>
                                LOGIN {active && <div className="ld ld-ring ld-spin"></div>}
                            </button>
                            <AuthFormOptions />
                        </form>
                        <form onSubmit={ this.handleSubmit } id="signup" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text"
                                    placeholder="Username" 
                                    name="username" id="username" 
                                    onChange={this.handleChange}
                                    value={ username }
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" 
                                    placeholder="Email"
                                    name="email" id="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" 
                                    placeholder="Password"
                                    name="password" id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" 
                                    placeholder="Confirm Password"
                                    name="confirmpassword" id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button type="submit" onClick={ this.handleActive } className={ active? " btn solid ld-ext-right running": "btn solid"}>
                                Sign Up {active && <div className="ld ld-ring ld-spin"></div>}
                            </button>
                            <AuthFormOptions />
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p> Lorem ipsum Hello new user hope you enjoy this experience. </p>
                            <button className="btn transparent" id="signup" onClick= { this.handleSign }> Sign up </button>
                        </div>
                        <img src={ signin } className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p> &nbsp; Welcome Back! We missed you, let's get you up-to-date &nbsp; </p>
                            <button className="btn transparent" id="signin" onClick= { this.handleSign }> Sign in </button>
                        </div>
                        <img src={ signup } className="image" alt="" />
                    </div>
                </div>
            </div>
            // <div>
            //     <div className="row justify-content-md-center text-center">
            //         <form onSubmit={this.handleSubmit}>
            //             <h2>{heading}</h2>
            //             {errors.message && <div className="alert alert-danger">{errors.message}</div>}
            //             <label htmlFor='email' >Email:</label>
            //             <input className='form-control' type="email" name="email" id="email"
            //                 onChange={this.handleChange}
            //                 value={email}
            //             />
            //             <label htmlFor='password' >Password:</label>
            //             <input className='form-control' type="password" name="password" id="password"
            //                 onChange={this.handleChange}
            //             />
            //             {signup &&
            //                 <div>
            //                     <label htmlFor='username' >Username:</label>
            //                     <input className='form-control' type="text" name="username" id="username"
            //                         onChange={this.handleChange}
            //                         value={username}
            //                     />
            //                     <label htmlFor='profileImage' >Profile Image:</label>
            //                     <input className='form-control' type="text" name="profileImage" id="profileImage"
            //                         onChange={this.handleChange}
            //                         value={profileImage}
            //                     />
            //                 </div>
            //             }
            //             <button type="submit" className="btn btn-primary btn-block btn-lg mt-3" >{buttonText}</button>
            //         </form>
            //     </div>
            // </div>
            
        );
    };
}
