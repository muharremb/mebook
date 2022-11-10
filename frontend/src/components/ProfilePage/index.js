import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './ProfilePage.css'
import { fetchUser } from "../../store/users";
import { fetchPosts } from "../../store/posts";

const ProfilePage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.currentUserId);
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[userId];

    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchPosts({author_id: userId}));    
    }, [userId, dispatch]);

    if(userProfile) {
    return ( 
        <div className="full-profile-page-container">
        <div className="user-header">
            <div className="user-left">
                <div className="user-photo-div">
                    <img src={userProfile.photo} height="200px" width="200px"/>
                </div>
                <div className="user-name-div">
                    <h1>userProfile: {userProfile.firstName} {userProfile.lastName}</h1>
                </div>
            </div>
            <div className="user-friend-request-button">
                <h1 id="friend-request-button">Edit Profile</h1>
            </div>
        </div>

    <div className="main-lower-part">
        <div className="user-down-page">
            <div className="about-me">
                <h1 id="about-me-intro">Intro</h1>
                <div className="add-details">
                    <h1 id="add-bio">Add bio</h1>
                </div>
                <div className="add-details">
                    <h1 id="add-home">Add education</h1>
                </div>
                <div className="add-details">
                    <h1 id="edit-details">Add work</h1>
                </div>
                <div className="add-details">
                    <h1 id="add-hobbies">Add hobbies</h1>
                </div>
            </div>
            <div className="post-side-div">
                <div className="user-post-side">
                    <i id="user-post-photo" className="fa-solid fa-user"></i>
                    <div className="user-post-div">
                        <h1 id="user-post">What is on your mind?</h1>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
     );
    }
    else return(
        <h1>Loading</h1>
    );
}

export default ProfilePage;