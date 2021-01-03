import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNewMessage } from '../store/actions/messages';
import autosize from "autosize";

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
    componentDidMount() {
        this.textarea.focus();
        autosize(this.textarea);
    }
    render() {
        const { profileImage, username } = this.props;
        const { text } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="new-tweet">
                    <img src={profileImage || "https://abs.twimg.com/favicons/twitter.ico"} alt={username} />
                    <div className="tweet-content">
                        {/* <input 
                            type="textarea" 
                            name="text"
                            placeholder="What's on your Mind?"
                            onChange={this.handleChange}
                            value={text}
                        /> */}
                            <textarea 
                            name="text" 
                            ref={c => (this.textarea = c)}
                            rows="1"
                            placeholder="What's on your Mind?" 
                            value={text}
                            onChange={this.handleChange}
                            maxLength="50"
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
