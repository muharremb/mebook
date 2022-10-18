import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts } from '../../../store/posts';
import NavBar from '../../NavBar';
import PostLists from '../PostLists';
import './FeedsPage.css'

const FeedsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);

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