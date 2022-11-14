import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from '../TimeAgo';
import defaultProfilePhoto from '../../../assets/defaultProfileImage.png';
import EditDropDownButton from '../PostLists/editDropDown';
import { fetchUser } from '../../../store/users';
import { fetchPosts } from '../../../store/posts';

const FeedsPagePostList = ({userId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === parseInt(userId)));
    const sessionUserProfile = useSelector(state => Object.values(state.users).find((row) => row.id === sessionUser.id))
    const posts = useSelector(state => state.posts.byId);
    const users = useSelector(state => state.users);

    const [showMenu, setShowMenu] = useState(false);
    const [friendsFetch, setFriendsFetch] = useState(false);

    useEffect(() => {
        const fetchUsersPostsData = async() => {
            if(userId) {
                setFriendsFetch(false)
                for (const friend of userProfile.friends) {
                    await dispatch(fetchUser(friend));
                    await dispatch(fetchPosts(friend));
                }                
                setFriendsFetch(true);
            }
        }
        fetchUsersPostsData();
        // if(userId) {
        //     userProfile.friends.forEach(friend => dispatch(fetchUser(friend)));
        //     userProfile.friends.forEach(friend => dispatch(fetchPosts(friend)));
        // }
    }, [dispatch]);

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
    
    if(!userProfile || !sessionUser ) {
        return (
            <p>User has no posts</p>
            )
        }

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }
    
    // console.log('posts onemli ', relatedPosts);
    // console.log('allUsers ', allUsers);
    // console.log('friends fethc ', friendsFetch);
    if(!friendsFetch) return null;
    
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