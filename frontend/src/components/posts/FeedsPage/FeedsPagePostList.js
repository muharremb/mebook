import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TimeAgo } from '../TimeAgo';
import defaultProfilePhoto from '../../../assets/defaultProfileImage.png';
import EditDropDownButton from '../PostLists/editDropDown';

const FeedsPagePostList = ({authorId, friends}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === authorId))
    const userPosts = Object.values(posts.byId).reverse().filter(post => post.authorId === authorId || userProfile.friends.includes(post.authorId));
    
    const [showMenu, setShowMenu] = useState(false);
    const [postUpdated, setPostUpdated] = useState(false);
    
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

    userPosts.forEach((post) => {
        if(post.authorId === userProfile.id) {
            post['authorDetails'] = userProfile;
        } else {
            post['authorDetails'] = friends.find((friend) => friend.id === post.authorId)
        }
    })

    const renderedPosts = userPosts.map(post => (
        <div className="post-box" key={post.id}>
            <div className="head-post-form">

            <div className="profile-pic-name">
                
                <img src={post.authorDetails.photo || defaultProfilePhoto}/>
                <div className="username-timeago">
                    <p>{post.authorDetails.firstName} {post.authorDetails.lastName}</p>
                    <TimeAgo timestamp={post.updatedAt} />
                </div>
            </div>
            <div className="edit-post-button-div">
                { userProfile.id === post.authorDetails.id && <EditDropDownButton post={post} userProfile={userProfile}/>}
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

export default FeedsPagePostList;