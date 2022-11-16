import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from '../TimeAgo';
import defaultProfilePhoto from '../../../assets/defaultProfileImage.png';
import EditDropDownButton from '../PostLists/editDropDown';
import { fetchUser } from '../../../store/users';
import { fetchPosts } from '../../../store/posts';
import { useHistory } from 'react-router-dom';

const FeedsPagePostList = ({userId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === parseInt(userId)));
    const sessionUserProfile = useSelector(state => Object.values(state.users).find((row) => row.id === sessionUser.id))
    const posts = useSelector(state => state.posts.byId);
    const users = useSelector(state => state.users);

    const [showMenu, setShowMenu] = useState(false);
    const [friendsFetch, setFriendsFetch] = useState(false);

    const history = useHistory();

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
    }, [dispatch]);

    const allUsers = [userProfile];
    Object.values(users).forEach((user) => {
        if(userProfile.friends.includes(user.id)) {
            allUsers.push(user)
        }
    })
    
    useEffect(() => {
        if(!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const relatedPosts = [];
    if(!posts) return null;
    
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

    const goToUserPage = (e, id) => {
        history.push(`/users/${id}`);
    };
    
    
    if(!userProfile || !sessionUser ) {
        return (
            <p>User has no posts</p>
            )
        }

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }
    
    if(!friendsFetch || posts.length === 0) return null;
    
    const renderedPosts = relatedPosts.map(post => (
        <div className="post-box" key={post.id}>
            <div className="head-post-form">

                <div className="profile-pic-name" onClick={event => goToUserPage(event, post.authorId)}>
                    <img src={getUserFromId(post.authorId, allUsers).photo || defaultProfilePhoto} width="40px" height="40px"/>
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