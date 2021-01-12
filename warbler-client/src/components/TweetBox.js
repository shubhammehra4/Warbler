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
    };

    return (
        <form onSubmit={ handleSubmit }>
                <div className="new__tweet">
                    <img src={profileImage || "https://images.unsplash.com/profile-1601277045639-93845dc02dd2image"} alt={ username } />
                    <div className="tweet-content">
                        <TextareaAutosize
                            name="text" 
                            placeholder="What's on your Mind?" 
                            value={ text }
                            onChange={ handleChange }
                            maxLength={ 150 }
                            maxRows={ 15 }
                        />
                        <div className="new__tweet__options">
                            <i class="far fa-image"></i>
                            <i class="far fa-smile"></i>
                            <button disabled={ !text } type="submit">Tweet</button>
                        </div>
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