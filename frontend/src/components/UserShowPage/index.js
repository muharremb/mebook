import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import { fetchUser, uploadPhoto, sendFriendRequest, fetchUsers, cancelFriendRequest, removeFriendship } from '../../store/users';
import NavBar from '../NavBar';
import PostLists from '../posts/PostLists';
import './UserShowPage.css'
import { EditUserFormModal } from '../users/EditProfileModal';
import { Modal } from '../../context/Modal';
import { PostModal } from '../posts/PostForm/PostForm';
import defaultProfilePhoto from '../../assets/defaultProfileImage.png';
import defaultCoverImage from '../../assets/grayBackground.jpg';
import demoCoverImage from '../../assets/demoCoverImage.jpeg';
import csrfFetch from '../../store/csrf';
import UploadPhotoForm from './UploadPhotoForm';


const UserShowPage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [friendStatus, setFriendStatus] = useState(null);
    
    const sessionUser = useSelector(state => state.session.currentUserId);
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === parseInt(userId)));
    const sessionUserProfile = useSelector(state => Object.values(state.users).find((row) => row.id === sessionUser.id))
    
    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchUser(sessionUser.id));
        dispatch(fetchPosts({author_id: parseInt(userId)}));
    }, [userId, friendStatus, dispatch]);

    const [post, setPost] = useState('');
    
    if(!sessionUser || !userProfile || !sessionUserProfile) {
        return null;
    }
    
    let imageSource = defaultCoverImage;

    if(userProfile.id === 1) {
        let imageSource = demoCoverImage;
    }

    const handleUpload = async e => {
        e.preventDefault();

        const formData = new FormData();
        
        if(profilePhoto) {
            formData.append('user[photo]', profilePhoto);
        }
        const res = await csrfFetch(`/api/users/${userProfile.id}`, {
            method: 'PUT',
            body: formData
        });
        dispatch(fetchUser(userProfile.id));
    }
    const handleFile = e => {
        const file = e.currentTarget.files[0];
        setProfilePhoto(file);
    }

    const handleFriendRequest = e => {
        dispatch(sendFriendRequest(userId));
        setFriendStatus('pending');
    }

    const handleCancelRequest = e => {
        dispatch(cancelFriendRequest(userId));
        setFriendStatus('notFriend');
    }

    const handleRemoveFriendship = e => {
        dispatch(removeFriendship(sessionUser.id, userId));
        setFriendStatus('notFriend');
    }
    
    return (
        <>
            <NavBar />
            <div className="user-show">  
                <img src={userProfile.coverImage ? userProfile.coverImage : defaultCoverImage} className='cover-image'/>
                 
                <div className="user-show-head">
                    <div className="user-left-head">

                        <div className="user-profile-photo">
                            <img src={userProfile.photo || defaultProfilePhoto} height="175px" width="175px"/>
                            {/* <form onSubmit={handleUpload}>
                                <input type="file" onChange={handleFile} />
                                <button>upload</button>
                            </form> */}
                            {sessionUser.id === userProfile.id && 
                            <div className="upload-pic">
                                    <i className="fa-solid fa-camera fa-2x"></i>
                            </div>
                            }
                        </div>
                        <div className="user-name">
                            <h1 id="username">{userProfile.firstName} {userProfile.lastName}</h1>
                        </div>
                    </div>
                        <div className='edit-user-form-modal-div'>
                            {sessionUser.id === userProfile.id && 
                            (
                                <EditUserFormModal userId={userProfile.id}/>
                            )}
                        </div>
                        <div className="friending">
                            {sessionUserProfile.senders.includes(parseInt(userId)) && (
                                <button onClick={handleCancelRequest}>Cancel Request</button>
                            )}
                            {sessionUserProfile.friends.includes(parseInt(userId)) && (
                                <button onClick={handleRemoveFriendship}>Unfriend</button>
                            )}
                            {sessionUser.id !== userProfile.id && 
                                !sessionUserProfile.friends.includes(parseInt(userId)) && 
                                !sessionUserProfile.receivers.includes(parseInt(userId)) &&
                                !sessionUserProfile.senders.includes(parseInt(userId)) &&
                            (
                                <button onClick={handleFriendRequest}>Add Friend</button>
                            )}
                        </div>
                </div>

                <div className="user-show-down">
                    <div className="user-bio">
                        <h1>Intro</h1>

                        <h2>Bio</h2>
                        {userProfile.bio ? <p>{userProfile.bio}</p> : <p>Add bio</p>}

                        <h2>Education</h2>
                        {userProfile.education ? <p>{userProfile.education}</p> : <p>Add education</p>}
                        <h2>Work</h2>
                        {userProfile.work ? <p>{userProfile.work}</p> : <p>Add work</p>}
                        <h2>Hobbies</h2>
                        {userProfile.hobbies ? <p>{userProfile.hobbies}</p> : <p>Add hobbies</p>}    
                    </div>

                    <div className="user-post-section">
                        <div className="post-form-div">
                            <div className="post-form" onClick={() => setShowModal(true)}>
                                <div className="user-pic-name">
                                    <img src={userProfile.photo || defaultProfilePhoto} width="50px" height="50px" />
                                </div>                       
                        <button id="new-post-input">What is on your mind?</button>
                    </div>
                            {showModal && (
                                <Modal onClose={() => setShowModal(false)} >
                                    <PostModal userProfile={userProfile} setShowModalFnc={setShowModal} />
                                </Modal>
                            )}
                        </div>
                        <div className="user-post-wall">
                            <PostLists authorId={userProfile.id}/>
                        </div>
                    </div>

                </div>
            </div>
        </> 
    );
}
 
export default UserShowPage;