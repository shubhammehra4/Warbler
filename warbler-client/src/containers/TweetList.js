import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from "react-redux";
import { fetchMessages, removeMessage, likeRequest, unlikeRequest } from '../store/actions/messages';
import TweetItem from '../components/TweetItem';


function TweetList ({ messages, removeMessage, currentUser, likeRequest, unlikeRequest, fetchMessages }) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        console.log("rendered");
        setLoading(true)
        
        fetchMessages(page)
        .then(res => {
            console.log("sent");
            setHasMore(res);
            setLoading(false);
        });
    }, [page, fetchMessages]);

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPage(prevPageNumber => prevPageNumber + 1)
        }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])
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
                        ref={messages.length === index+1 ? lastBookElementRef : null}
                    />
                ))
                }
            </ul>
            <div style={{fontSize:"100px"}}>{loading && 'Loading...'}</div>
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