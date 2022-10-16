import React from 'react';
import { useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/posts';

const PostLists = ({authorId}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
    const userPosts = Object.values(posts.byId).filter(post => post.authorId === authorId);
    
    if(!posts) {
        return (
            <p>User has no posts</p>
        )
    }

    const renderedPosts = userPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <p className="post-content">{post.body}</p>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>User Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostLists;