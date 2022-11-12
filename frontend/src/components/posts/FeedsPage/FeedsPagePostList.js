import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from '../TimeAgo';
import defaultProfilePhoto from '../../../assets/defaultProfileImage.png';
import EditDropDownButton from '../PostLists/editDropDown';

const FeedsPagePostList = ({userId}) => {
    const sessionUser = useSelector(state => state.session.currentUserId);
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === parseInt(userId)));
    const sessionUserProfile = useSelector(state => Object.values(state.users).find((row) => row.id === sessionUser.id))
    const posts = useSelector(state => state.posts.byId);
    // const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
    const users = useSelector(state => state.users);

    const [showMenu, setShowMenu] = useState(false);

    const allUsers = [userProfile];
    
    Object.values(users).forEach((user) => {
        if(userProfile.friends.includes(user.id)) {
            allUsers.push(user)
        }
    })

    const relatedPosts = [];
    Object.values(posts).reverse().map((post) => {
        if(userProfile.friends.includes(post.authorId) || userProfile.id === post.authorId) {
            relatedPosts.push(post);
        }
    })

    const getUserFromId = (id, allUsers) => {
        return(
            allUsers.find((user) => user.id === id)
        )
    }
    
    useEffect(() => {
        if(!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);
    
    if(!userProfile || !sessionUser) {
        return (
            <p>User has no posts</p>
            )
        }

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }

    const renderedPosts = relatedPosts.map(post => (
        <div className="post-box" key={post.id}>
            <div className="head-post-form">

            <div className="profile-pic-name">
                
                <img src={getUserFromId(post.authorId, allUsers).photo || defaultProfilePhoto}/>
                <div className="username-timeago">
                    <p>{getUserFromId(post.authorId, allUsers).firstName} {getUserFromId(post.authorId, allUsers).lastName}</p>
                    <TimeAgo timestamp={post.updatedAt} />
                </div>
            </div>
            <div className="edit-post-button-div">
                { userProfile.id === getUserFromId(post.authorId, allUsers).id && <EditDropDownButton post={post} userProfile={userProfile}/>}
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