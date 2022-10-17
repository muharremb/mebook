import React from 'react';
import { useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/posts';
import './PostLists.css';

const PostLists = ({authorId}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
    const userPosts = Object.values(posts.byId).reverse().filter(post => post.authorId === authorId);
    
    if(!posts) {
        return (
            <p>User has no posts</p>
        )
    }

    const renderedPosts = userPosts.map(post => (
        <div className="post-box" key={post.id}>
            <p className="post-content">{post.body}</p>
        </div>
    ))

    return (
        <>
            {renderedPosts}
        </>
    )
}

export default PostLists;