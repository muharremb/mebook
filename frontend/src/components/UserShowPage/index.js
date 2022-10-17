import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, getUserPosts } from '../../store/posts';
import { fetchUser } from '../../store/users';
import NavBar from '../NavBar';
import EditPostForm from '../posts/EditPostForm/EditPostForm';
import AddPostForm from '../posts/PostForm/PostForm';
import PostLists from '../posts/PostLists';
import './UserShowPage.css'
import EditUserForm from '../users/EditProfileModal';

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
    
    if(!sessionUser || !userProfile) {
        return null;
    }
    
    return (
        <>
            <NavBar />
            <div className="user-show">  
                
                <img src="https://picsum.photos/seed/picsum/900/400" className='cover-image'/>
                 
                <div className="user-show-head">
                    <div className="user-profile-photo">
                        <img src={userProfile.photo} height="175px" width="175px"/>
                    </div>
                    <div className="user-name">
                        <h1 id="username">{userProfile.firstName} {userProfile.lastName}</h1>
                    </div>

                    <EditUserForm userId={userProfile.id}/>
                </div>

                <div className="user-show-down">
                    <div className="user-bio">
                        <h1>Intro</h1>
                        <p>{userProfile.bio}</p>
                        {userProfile.education ? <p>{userProfile.education}</p> : <p>Add education</p>}
                        {userProfile.work ? <p>{userProfile.work}</p> : <p>Add work</p>}
                        {userProfile.hobbies ? <p>{userProfile.hobbies}</p> : <p>Add hobbies</p>}
                        
                    </div>

                    <div className="user-post-section">
                        <AddPostForm imgURL={userProfile.photo} />
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