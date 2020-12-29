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
                    <input 
                        className="form-control rounded-pill new-message" 
                        type="text" 
                        name="text"
                        placeholder="What's on you Mind?"
                        onChange={this.handleChange}
                        value={text}
                    />
                    <button className="post-message" type="submit">Tweet</button>
                </div>
                <hr></hr>
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
