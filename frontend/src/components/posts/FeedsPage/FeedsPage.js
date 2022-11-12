import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../NavBar';
import { NavLink } from 'react-router-dom';
import { fetchUser } from '../../../store/users';
import { fetchPosts } from '../../../store/posts';
import './FeedsPage.css'
import { PostModal } from '../PostForm/PostForm';
import { Modal } from '../../../context/Modal';
import defaultProfilePhoto from '../../../assets/defaultProfileImage.png';
import FeedsPagePostList from './FeedsPagePostList';

const FeedsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);
    const userId = sessionUser ? sessionUser.id : 0;
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === userId));
    const [loaded, setLoaded] = useState(false);
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}})
        
    useEffect(() => {
        if(userId) {
            dispatch(fetchUser(userId)).then(() => setLoaded(true));
            dispatch(fetchPosts({author_id: userId}));    
            
            if(userProfile) {
                userProfile.friends.forEach(friend => dispatch(fetchUser(friend)));
                userProfile.friends.forEach(friend => dispatch(fetchPosts(friend)));
            }
        }
    }, [loaded]);

    const [showModal, setShowModal] = useState(false)

    if(!sessionUser || !userProfile) return null;

    return ( 
        <>
            <NavBar />
            <div className="feeds-page-container">
                <div className='feeds-left'>
                    <NavLink to={`/users/${sessionUser.id}`} >
                    <div className="photo-firstname-lastname">
                        <img src={userProfile.photo || defaultProfilePhoto} width="50px" height="50px" alt=''/>
                        <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    </div>
                    </NavLink>
                    <div className="linkedin">
                        <i className="fa-brands fa-linkedin fa-2xl"></i>
                        <a href="https://www.linkedin.com/in/muharremboztepe/" target="_blank">
                            <h1>Linkedin</h1>
                        </a>
                    </div>
                    <div className="github">
                        <i className="fa-brands fa-github fa-2xl"></i>
                        <a href="https://github.com/muharremb" target="_blank">
                            <h1>Github</h1>
                        </a>
                    </div>
                </div>
                <div className="feeds-middle">
                    <div className="post-form-div">
                        <div className="post-form" onClick={() => setShowModal(true)}>
                            <div className="user-pic-name">
                                <img src={userProfile.photo || defaultProfilePhoto} width="50px" height="50px" />
                            </div>                       
                            <button id="new-post-input">What is on your mind?</button>
                        </div>
                    </div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)} >
                            <PostModal userProfile={userProfile} setShowModalFnc={setShowModal} />
                        </Modal>
                    )}
                    <FeedsPagePostList userId={userId} />
                </div>
                <div className='feeds-right'></div>
            </div>
        </>
     );
}
 
export default FeedsPage;