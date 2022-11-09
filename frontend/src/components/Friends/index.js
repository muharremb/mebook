import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, fetchUser, getPendingRequesters } from '../../store/users';
import NavBar from '../NavBar';
import './Friend.css'

function FriendRequestCard({profile, sessionUserId, cb}) {
    const dispatch = useDispatch();
    const handleAcceptRequest = () => {
        console.log('accept request');
        dispatch(acceptFriendRequest(sessionUserId, profile.id));
        cb(false);
    }
    const handleDeclineRequest = () => {
        console.log('decline request');
    }
    return (
        <>
            <h1>{profile.firstName}</h1>
            <h1>{profile.lastName}</h1>
            <button onClick={handleAcceptRequest}>Accept</button>
            <button onClick={handleDeclineRequest}>Decline</button>
        </>
    )
}

function FriendCard() {
    return (
        <h1>Friend Card</h1>
    )
}

function FriendRequestList() {
    const sessionUser = useSelector(state => state.session.currentUserId);
    const sessionUserProfile = useSelector(state => Object.values(state.users).find((row) => row.id === sessionUser.id))
    const pendingRequests = useSelector(getPendingRequesters(sessionUserProfile ? sessionUserProfile.receivers : []));
    
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [friendsLoaded, setFriendsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(fetchUser(sessionUser.id)).then(() => setLoaded(true))
        if(sessionUserProfile) {
            sessionUserProfile.receivers.forEach(rec => dispatch(fetchUser(rec)));
        }
    }, [dispatch, loaded]);
    
    if(!sessionUser || !sessionUserProfile) {
        return null;
    }
    const requests = pendingRequests.map(user => (
        <FriendRequestCard key={user.id} profile={user} sessionUserId={sessionUser.id} cb={setLoaded}/>
    ));

    return (
        <>
            <h1>Friend Request List</h1>
            {requests}
            <h1>Friends List</h1>
        </>
    )
}

const Friends = () => {
    return ( 
        <>
            <NavBar />
            <FriendRequestList />
        </>
     );
}
 
export default Friends;