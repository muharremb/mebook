import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/posts';
import AddPostForm from '../PostForm/PostForm';
import { TimeAgo } from '../TimeAgo';
import './PostLists.css';
import defaultProfilePhoto from '../../../assets/defaultProfileImage.png';
import EditDropDownButton from './editDropDown';

const PostLists = ({authorId}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
    const userPosts = Object.values(posts.byId).reverse().filter(post => post.authorId === authorId);
    
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[authorId];
    
    const [showMenu, setShowMenu] = useState(false);
    
    useEffect(() => {
        if(!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    if(!posts || !userProfile) {
        return (
            <p>User has no posts</p>
        )
    }

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }

    const renderedPosts = userPosts.map(post => (
        <div className="post-box" key={post.id}>
            <div className="head-post-form">

            <div className="profile-pic-name">
                
                <img src={userProfile.photo || defaultProfilePhoto}/>
                <div className="username-timeago">
                    <p>{userProfile.firstName} {userProfile.lastName}</p>
                    <TimeAgo timestamp={post.updatedAt} />
                </div>
            </div>
            <div className="edit-post-button-div">
                {<EditDropDownButton post={post} userProfile={userProfile}/>}
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