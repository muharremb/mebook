import Friends from "../components/Friends";
import csrfFetch from "./csrf";

const ADD_USER = 'users/addUser';
const ADD_USERS = 'users/addUsers';
const UPDATE_USER = 'users/updateUser';

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

export const addUsers = (users) => {
    return {
        type: ADD_USERS,
        payload: users
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const getPendingRequesters = (pendings) => state => {
    let pendingsList = [];
    if (!state.users) {
        return pendingsList
    } else {
        Object.values(state.users).forEach(user => {
            if(pendings.includes(user.id)) {
                pendingsList.push(user);
            }
        });
    }
    return pendingsList;
} 

export const fetchUsers = (userList) => async dispatch => {
    dispatch(addUsers(userList));
}

export const fetchUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)
    const data = await response.json();
    dispatch(addUser(data.user));
}

export const editUser = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            bio: user.bio,
            education: user.education,
            work: user.work,
            hobbies: user.hobbies,
            birthday: user.birthday
        })
    })
    const data = await response.json()
    dispatch(updateUser(data));
}

export const sendFriendRequest = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            friending: userId
        })
    })
    const data = await response.json()
    dispatch(updateUser(data));
}

export const acceptFriendRequest = (id, userId) => async dispatch => {
    console.log('acceptFriend')
    const response = await csrfFetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            accepting: userId
        })
    })
    const data = await response.json()
    // console.log('data accepFriendship ', data);
    dispatch(updateUser(data))
}

export const cancelFriendRequest = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            cancelling: userId
        })
    })
    const data = await response.json()
    dispatch(updateUser(data));
}

export const removeFriendship = (id, userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            removing: userId
        })
    })
    const data = await response.json();
    dispatch(updateUser(data));
}

export const uploadPhoto = (user, formData) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: formData
    });
    const data = response.json();
}

export const addSessionUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    return dispatch(fetchUser(data.user.id))
}

function usersReducer(state={}, action) {
    const newState = {...state};
    
    const byId = state["byId"] ? {...state["byId"]}:{};
    const allIds = state["allIds"] ? state["allIds"]:[];
    let user;
    let newbyId;

    switch(action.type) {
        
        case ADD_USER:
            // user = action.payload.user;
            // newbyId = {...byId, [user.id]: user};

            // if(!allIds.includes(user.id)) allIds.push(user.id);
            
            // return {"byId": newbyId, "allIds": allIds}
            return {...state, [action.payload.id]: action.payload}
    
        case UPDATE_USER:
            const {id, bio, education, work, hobbies, birthday } = action.payload.user;

            const existingUser = Object.values(byId).find(user => user.id === id)
            // console.log('existingUser ', existingUser)
            // console.log('Object.values(byId) ', Object.values(byId))
            // console.log('action.payload ', action.payload)
            if(existingUser) {
                existingUser.bio = bio;
                existingUser.education = education;
                existingUser.work = work;
                existingUser.hobbies = hobbies;
                existingUser.birthday = birthday;
                return {"byId": {...byId, [existingUser.id]: existingUser}, "allIds": allIds};
            }
            return newState
        default:
            return state;
    }
}

export default usersReducer;