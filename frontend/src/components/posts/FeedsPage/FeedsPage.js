import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../NavBar';
import PostLists from '../PostLists';
import { fetchUser } from '../../../store/users';
import { fetchPosts } from '../../../store/posts';
import './FeedsPage.css'
import { PostModal } from '../PostForm/PostForm';
import { Modal } from '../../../context/Modal';

const FeedsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId ? state.session.currentUserId : {currentUserId: {}} );
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[sessionUser.id];
    const userId = sessionUser ? sessionUser.id : 0;
    
    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchPosts({author_id: userId}));    
    }, []);

    const [showModal, setShowModal] = useState(false)

    if(!sessionUser || !userProfile) return null;
    // console.log('setModal ', showModal)
    return ( 
        <>
            <NavBar />
            <div className="feeds-page-contaier">
                <div className="feeds-middle">
                    <div className="post-form-div">
                        <div className="post-form" onClick={() => setShowModal(true)}>
                            <div className="user-pic-name">
                                <img src={userProfile.photo} width="50px" height="50px" />
                            </div>                       
                            <button id="new-post-input">What is on your mind?</button>
                        </div>
                    </div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)} >
                            <PostModal userProfile={userProfile} setShowModalFnc={setShowModal} />
                        </Modal>
                    )}
                    <PostLists authorId={sessionUser.id} />
                </div>
            </div>
        </>
     );
}
 
export default FeedsPage;