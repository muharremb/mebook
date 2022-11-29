import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, cancelFriendRequest, fetchUser, getPendingRequesters, removeFriendship } from '../../store/users';
import NavBar from '../NavBar';
import './Friend.css'
import defaultProfilePhoto from '../../assets/defaultProfileImage.png';
import { useHistory } from 'react-router-dom';

function FriendRequestCard({profile, sessionUserId, cb}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleAcceptRequest = () => {
        dispatch(acceptFriendRequest(sessionUserId, profile.id));
        cb(false);
    }
    const handleDeclineRequest = () => {
        dispatch(cancelFriendRequest(sessionUserId, profile.id));
        cb(false);
    }

    const goToUserPage = (e, id) => {
        history.push(`/users/${id}`);
    }
    return (
        <div className="request-card-container">
            <div className="img-container" onClick={e => goToUserPage(e, profile.id)}>
                <img src={profile.photo || defaultProfilePhoto} height="220px" width="220px"/>
            </div>
            <div className="request-card-name">
                <div onClick={e => goToUserPage(e, profile.id)}>
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

function FriendCard({profile}) {
    const history = useHistory();
    const goToUserPage = (e, id) => {
        history.push(`/users/${id}`);
    }

    return (
        <>
            <div className="friend-card-container">
                <img src={profile.photo || defaultProfilePhoto} width="80px" height="80px" id="friend-card-photo"/>
                <div className="friend-card-name" onClick={e => goToUserPage(e, profile.id)}>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                </div>
            </div>
        </>
    )
}

function SuggestedFriendCard({profile}) {
    const history = useHistory();
    const goToUserPage = (e, id) => {
        history.push(`/users/${id}`);
    }

    return (
        <>
            <div className="friend-card-container">
                <img src={profile.photo || defaultProfilePhoto} width="80px" height="80px" id="friend-card-photo"/>
                <div className="friend-card-name" onClick={e => goToUserPage(e, profile.id)}>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                </div>
            </div>
        </>
    )
}

function FriendRequestList() {
    const sessionUser = useSelector(state => state.session.currentUserId);
    const sessionUserProfile = useSelector(state => Object.values(state.users).find((row) => row.id === sessionUser.id))
    const pendingRequests = useSelector(getPendingRequesters(sessionUserProfile ? sessionUserProfile.receivers : []));
    const friends = useSelector(state => Object.values(state.users)).filter((row) => sessionUserProfile.friends.includes(row.id));

    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [friendsLoaded, setFriendsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(fetchUser(sessionUser.id)).then(() => setLoaded(true))
        
        const fetchFriends = async() => {
            for (const friend of sessionUserProfile.friends) {
                await dispatch(fetchUser(friend))
            }
        }

        if(sessionUserProfile) {
            sessionUserProfile.receivers.forEach(rec => dispatch(fetchUser(rec)));
            fetchFriends();
        }
    }, [dispatch, loaded]);

    if(!sessionUser || !sessionUserProfile || typeof friends == "undefined" ) {
        return null;
    }

    const requests = pendingRequests.map(user => (
        <FriendRequestCard key={user.id} profile={user} sessionUserId={sessionUser.id} cb={setLoaded}/>
    ));
    
    const friendLists = friends.map(friend => (
        <FriendCard key={friend.id} profile={friend} />
    ));

    const suggestionLists = <h2>Suggestion Lists</h2>

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
                <h1>Friends</h1>
                <div className='friend-list-box'>
                    {friendLists}
                </div>
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