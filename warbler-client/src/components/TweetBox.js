import React, { useState } from 'react';
import { connect } from "react-redux";
import TextareaAutosize from "react-autosize-textarea";
import { postNewMessage } from '../store/actions/messages';


function TweetBox({ profileImage, username, postNewMessage }) {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postNewMessage(text);
        setText('');
        console.log("clicked");
    };

    return (
        <form onSubmit={ handleSubmit }>
                <div className="new__tweet">
                    <img src={profileImage || "https://abs.twimg.com/favicons/twitter.ico"} alt={ username } />
                    <div className="tweet-content">
                        <TextareaAutosize
                            name="text" 
                            placeholder="What's on your Mind?" 
                            value={ text }
                            onChange={ handleChange }
                            minLength="1"
                            maxLength="100"
                            maxRows="15"
                        />
                        <button className="tweet__post" disabled={ !text } type="submit">Tweet</button>
                    </div>
                </div>
            </form>
    );
}

function mapStateToProps(state) {
    return {
        error: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(TweetBox);