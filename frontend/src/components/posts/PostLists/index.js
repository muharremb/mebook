import React from 'react';
import { useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/posts';
import { TimeAgo } from '../TimeAgo';
import './PostLists.css';

const PostLists = ({authorId}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
    const userPosts = Object.values(posts.byId).reverse().filter(post => post.authorId === authorId);
    
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[authorId];

    
    if(!posts) {
        return (
            <p>User has no posts</p>
        )
    }

    const renderedPosts = userPosts.map(post => (
        <div className="post-box" key={post.id}>
            <div className="profile-pic-name">
                <img src={userProfile.photo}/>
                <div className="username-timeago">
                    <p>{userProfile.firstName} {userProfile.lastName}</p>
                    <TimeAgo timestamp={post.updatedAt} />
                </div>
            </div>
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