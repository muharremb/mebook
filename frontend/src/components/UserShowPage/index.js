import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, getUserPosts } from '../../store/posts';
import { fetchUser } from '../../store/users';
import NavBar from '../NavBar';
import EditPostForm from '../posts/EditPostForm/EditPostForm';
import AddPostForm from '../posts/PostForm/PostForm';
import PostLists from '../posts/PostLists';
import UserPost from '../UserPost';

import './UserShowPage.css'

const UserShowPage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.currentUserId);
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[userId];
    
    // console.log('userProfile ', userProfile)

    // const posts = useSelector(getUserPosts(userProfile["id"]));
    // console.log('posts ', posts)
    // const userProfile = useSelector(state => state.users.byId ? state.users.byId[userId] : {})
    // const userProfile = useSelector(state => state.users.byId.userId);
    // if(!userProfile) {
    //     return (
    //         <section>
    //             <h1>User not found!</h1>
    //         </section>
    //     );
    // }
        
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

                    {/* <div>
                        <div className="edit-profile">Edit Profile</div>
                    </div> */}
                </div>

                <div className="user-show-down">
                    <div className="user-bio">
                        <h1>Intro</h1>
                        <p>{userProfile.bio}</p>
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