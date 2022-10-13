import { useParams } from "react-router-dom";
import './ProfilePage.css'

const ProfilePage = () => {
    const {userId} = useParams();

    return ( 
        <div className="full-profile-page-container">
            <div className="user-header">
                <div className="user-left">
                    <div className="user-photo-div">
                        <i id="user-photo" class="fa-solid fa-user"></i>
                    </div>
                    <div className="user-name-div">
                        <h1 id="first-last-name">First Name + Last Name</h1>
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
                        <h1 id="add-home">Add home</h1>
                    </div>
                    <div className="add-details">
                        <h1 id="edit-details">Edit details</h1>
                    </div>
                    <div className="add-details">
                        <h1 id="add-hobbies">Add hobbies</h1>
                    </div>
                    <div className="add-details">
                        <h1 id="add-featured">Add featured</h1>
                    </div>
                </div>

                <div className="post-side-div">
                    <div className="user-post-side">
                        <i id="user-post-photo" class="fa-solid fa-user"></i>
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

export default ProfilePage;