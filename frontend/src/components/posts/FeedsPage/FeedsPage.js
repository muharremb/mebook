import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../NavBar';
import PostLists from '../PostLists';
import { fetchUser } from '../../../store/users';
import { fetchPosts } from '../../../store/posts';
import './FeedsPage.css'

const FeedsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId ? state.session.currentUserId : {currentUserId: {}} );
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[sessionUser.id];
    const userId = sessionUser ? sessionUser.id : 0;
    console.log('in feedspage')
    
    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchPosts({author_id: userId}));    
    }, []);

    if(!sessionUser) return null;
    
    return ( 
        <>
            <NavBar />
            <div className="feeds-page-contaier">
                <div className="feeds-middle">
                    <PostLists authorId={sessionUser.id} />
                </div>
            </div>
        </>
     );
}
 
export default FeedsPage;