import React from 'react';
import { useSelector } from 'react-redux';

const PostLists = () => {
    const posts = useSelector(state => state.posts.byId)

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <p className="post-content">{post.body}</p>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}