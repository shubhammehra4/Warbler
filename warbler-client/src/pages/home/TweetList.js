import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from "react-redux";
import { fetchMessages, removeMessage, likeRequest, unlikeRequest } from '../../store/actions/messages';
import TweetItem from './TweetItem';


function TweetList ({ messages, removeMessage, currentUser, likeRequest, unlikeRequest, fetchMessages }) {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        console.log("rendered");
        setLoading(true)
        
        fetchMessages(count)
        .then(res => {
            console.log("sent");
            setHasMore(res);
            setLoading(false);
        });
    }, [count, fetchMessages]);

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            console.log("set count");
            setCount(messages.length)
        }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore, messages.length])
    return (
        <div className="tweetList">
            <ul className="tweets">
                { messages.map((m, index) => (
                    <TweetItem 
                        key={m._id} 
                        date={m.createdAt} 
                        text={m.text} 
                        likes={m.likesNumber}
                        username={m.user.username}
                        profileImage={ m.user.profileImage }
                        likeMessage={ likeRequest.bind(this, currentUser.id, m._id) }
                        unlikeMessage={ unlikeRequest.bind(this, currentUser.id, m._id) }
                        isCorrectUser={ currentUser.id ===  m.user._id }
                        removeMessage={ removeMessage.bind(this, m.user._id, m._id) }
                        ref={messages.length === index+5 ? lastBookElementRef : null}
                    />
                ))
                }
            </ul>
            {loading && 
                <div className="loading">
                    <div style={{alignItems:"center"}} className="ld ld-ring ld-spin"></div>
                </div>
            }
        </div>
    )
};

function mapStateToProps(state) {
    return {
        messages: state.messages,
        currentUser: state.currentUser.user
    };
};

export default connect(mapStateToProps, { fetchMessages, removeMessage, likeRequest, unlikeRequest })(TweetList);