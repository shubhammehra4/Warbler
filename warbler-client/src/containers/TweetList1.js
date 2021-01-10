import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from "react-redux";
import { fetchMessages, removeMessage, likeRequest, unlikeRequest } from '../store/actions/messages';
import TweetItem from '../components/TweetItem';
import axios from 'axios';


function TweetList1 ({ messages, removeMessage, currentUser, likeRequest, unlikeRequest }) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(2)
    const [messageList, setMessageList] = useState(messages); 
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios({
            method: "GET",
            url: "/api/messagePage",
            params: {page}
        }).then(res=> {
            console.log(res.data);
            setMessageList( prevMessages => {
                return [...new Set([...prevMessages, ...res.data.results])];
            });
            setHasMore(res.data.hasMore);
            setLoading(false)
        })
        .catch(err=> {
            console.log(err)
            setError(true);
        });
    }, [page]);

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
    // const { messages, removeMessage, currentUser, likeRequest, unlikeRequest } = this.props;
    // let feed = messageList.map(m => (
    //     <TweetItem 
    //         key={m._id} 
    //         date={m.createdAt} 
    //         text={m.text} 
    //         likes={m.likesNumber}
    //         username={m.user.username}
    //         profileImage={ m.user.profileImage }
    //         removeMessage={ removeMessage.bind(this, m.user._id, m._id) }
    //         likeMessage={ likeRequest.bind(this, m.user._id, m._id) }
    //         unlikeMessage={ unlikeRequest.bind(this, m.user._id, m._id) }
    //         isCorrectUser={ currentUser.id ===  m.user._id }
    //     />
    // ))
    return (
        <>
            { messageList.map((m, index) => (
                <TweetItem 
                    key={m._id} 
                    date={m.createdAt} 
                    text={m.text} 
                    likes={m.likesNumber}
                    username={m.user.username}
                    profileImage={ m.user.profileImage }
                    removeMessage={ removeMessage.bind(this, m.user._id, m._id) }
                    likeMessage={ likeRequest.bind(this, m.user._id, m._id) }
                    unlikeMessage={ unlikeRequest.bind(this, m.user._id, m._id) }
                    isCorrectUser={ currentUser.id ===  m.user._id }
                    ref={messageList.length === index+1 ? lastBookElementRef : null}
                />
            ))
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
        </>
    )
};

function mapStateToProps(state) {
    return {
        messages: state.messages,
        currentUser: state.currentUser.user
    };
};

export default connect(mapStateToProps, { fetchMessages, removeMessage, likeRequest, unlikeRequest })(TweetList1);