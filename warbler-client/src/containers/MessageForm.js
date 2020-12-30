import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        };
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postNewMessage(this.state.text);
        this.setState({text:''});
    };
    render() {
        const { profileImage, username } = this.props;
        const { text } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="new-message-form">
                    <img src={profileImage} alt={username} height="100" width="100" className="user-image" />
                    <div className="new-message-input">
                    <input 
                        className="form-control rounded-pill new-message" 
                        type="textarea" 
                        name="text"
                        placeholder="What's on your Mind?"
                        onChange={this.handleChange}
                        value={text}
                    />
                    <hr></hr>
                    <div className="post-message-options">
                        <button className="float-right post-message" type="submit">Tweet</button>
                    </div>
                    </div>
                    
                </div>
            </form>
        );
    };
}

function mapStateToProps(state) {
    return {
        error: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
