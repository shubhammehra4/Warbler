import React, { Component } from 'react';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImage: ""
        };
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(() => {
                return;
            });
    };

    render() {
        const { email, username, profileImage } = this.state;
        const { heading, buttonText, signup, errors, history, removeError } = this.props;
        history.listen(() => {
            removeError();
        });

        return (
            <div>
                <div className="container">
                    
                </div>
                <div className="row justify-content-md-center text-center">
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                        <label htmlFor='email' >Email:</label>
                        <input className='form-control' type="email" name="email" id="email"
                            onChange={this.handleChange}
                            value={email}
                        />
                        <label htmlFor='password' >Password:</label>
                        <input className='form-control' type="password" name="password" id="password"
                            onChange={this.handleChange}
                        />
                        {signup &&
                            <div>
                                <label htmlFor='username' >Username:</label>
                                <input className='form-control' type="text" name="username" id="username"
                                    onChange={this.handleChange}
                                    value={username}
                                />
                                <label htmlFor='profileImage' >Profile Image:</label>
                                <input className='form-control' type="text" name="profileImage" id="profileImage"
                                    onChange={this.handleChange}
                                    value={profileImage}
                                />
                            </div>
                        }
                        <button type="submit" className="btn btn-primary btn-block btn-lg mt-3" >{buttonText}</button>
                    </form>
                </div>
            </div>
            
        );
    };
}
