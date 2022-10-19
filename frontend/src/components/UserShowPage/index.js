import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import { fetchUser } from '../../store/users';
import NavBar from '../NavBar';
import AddPostForm from '../posts/PostForm/PostForm';
import PostLists from '../posts/PostLists';
import './UserShowPage.css'
import { EditUserFormModal } from '../users/EditProfileModal';
import { Modal } from '../../context/Modal';
import { PostModal } from '../posts/PostForm/PostForm';
import defaultProfilePhoto from '../../assets/defaultProfileImage.png';
import defaultCoverImage from '../../assets/grayBackground.jpg';
import demoCoverImage from '../../assets/demoCoverImage.jpeg';


const UserShowPage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false)
    
    const sessionUser = useSelector(state => state.session.currentUserId);
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[userId];
    
    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchPosts({author_id: parseInt(userId)}));    
    }, [userId, dispatch]);

    const [post, setPost] = useState('');
    
    if(!sessionUser || !userProfile) {
        return null;
    }
    
    let imageSource = defaultCoverImage;

    if(userProfile.id === 1) {
        let imageSource = demoCoverImage;
    } 

    return (
        <>
            <NavBar />
            <div className="user-show">  
                
                <img src={userProfile.id === 1 ? demoCoverImage:defaultCoverImage} className='cover-image'/>
                 
                <div className="user-show-head">
                    <div className="user-left-head">

                        <div className="user-profile-photo">
                            <img src={userProfile.photo || defaultProfilePhoto} height="175px" width="175px"/>
                        </div>
                        <div className="user-name">
                            <h1 id="username">{userProfile.firstName} {userProfile.lastName}</h1>
                        </div>
                    </div>
                        <div className='edit-user-form-modal-div'>
                            {sessionUser.id === userProfile.id && (
                                <EditUserFormModal userId={userProfile.id}/>
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