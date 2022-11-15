import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, cancelFriendRequest, fetchUser, getPendingRequesters, removeFriendship } from '../../store/users';
import NavBar from '../NavBar';
import './Friend.css'
import defaultProfilePhoto from '../../assets/defaultProfileImage.png';

function FriendRequestCard({profile, sessionUserId, cb}) {
    const dispatch = useDispatch();
    const handleAcceptRequest = () => {
        dispatch(acceptFriendRequest(sessionUserId, profile.id));
        cb(false);
    }
    const handleDeclineRequest = () => {
        console.log('decline ')
        dispatch(cancelFriendRequest(sessionUserId, profile.id));
        cb(false);
    }

    const goToUserPage = () => {

    }
    return (
        <div className="request-card-container">
            <div className="img-container" onClick={goToUserPage}>
                <img src={profile.photo || defaultProfilePhoto} height="220px" width="220px"/>
            </div>
            <div className="request-card-name">
                <div onClick={goToUserPage}>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                </div>

                <div className="request-card-buttons">
                    <button onClick={handleAcceptRequest} id="accept">Accept</button>
                    <button onClick={handleDeclineRequest} id="decline">Decline</button>
                </div>
            </div>
        </div>
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
        <div className="friend-container">
            <div className="friend-request-list">
                <h1>Friend Requests</h1>
                <div className="friend-cards-container">
                    {requests.length === 0 ? 
                    (<h2 id="no-friend-request">When you have friend requests, you will see them here</h2>)
                    : 
                    (requests) }
                </div>
            </div>
            <div className="friends-list">
                <h1>Friends List</h1>
            </div>
        </div>
    )
}

const Friends = () => {
    return ( 
        <div>
            <NavBar />
            <FriendRequestList />
        </div>
     );
}

export default Friends;