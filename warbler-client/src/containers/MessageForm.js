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
                <div className="new-tweet">
                    <img src={profileImage} alt={username} />
                    <div className="tweet-content">
                        <input 
                            type="textarea" 
                            name="text"
                            placeholder="What's on your Mind?"
                            onChange={this.handleChange}
                            value={text}
                        />
                        <button type="submit">Tweet</button>
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
