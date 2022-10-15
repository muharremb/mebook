import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import { fetchUser } from '../../store/users';
import NavBar from '../NavBar';
import UserPost from '../UserPost';

import './UserShowPage.css'

const UserShowPage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.currentUserId);
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[userId];

    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchPosts({author_id: parseInt(userId)}));    
    }, [userId, dispatch]);

    const [post, setPost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        setPost('')
    }

    if(userProfile) {

        return (
            <>
                <NavBar />
            <div className="user-show">
                {/* =======USER HEADER=========== */}
                <div className="user-show-head">
                    <div className="user-profile-photo">
                        <h1>{userProfile.firstName[0]}.{userProfile.lastName[0]}.</h1>
                    </div>
                    <div className="user-name">
                        <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    </div>
                </div>
    
                {/* =======USER HEADER END=========== */}
                {/* =======USER DOWN=========== */}
                <div className="user-show-down">
                    <div className="user-bio">
                        <h1>Intro</h1>
                        <h2>{userProfile.bio}</h2>
                    </div>
    
                    <div className="user-post-section">
                        <div className="user-page-post-form">
                            <div className="user-post-div">
                                <i className="fa-regular fa-user fa-xl"></i>
                                <form>
                                    <input type="text"
                                    value = {post}
                                    onChange={(e) => setPost(e.target.value)}
                                    className="user-post" 
                                    placeholder={`What is on your mind?`}/>

                                    <button onClick={handleSubmit} type="submit">Hidden</button>
                                </form>
                            </div>
                        </div>

                        <div className="user-post-wall">
                            <h1>User Post Index</h1>
                            <h2>Post1</h2>
                        </div>
                    </div>
    
                </div>
    
                {/* =======USER DOWN END=========== */}
    
            </div>
         </> 
        );
    }
    else return (
        <h1>loading</h1>
    )
}
 
export default UserShowPage;