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

export const fetchUsers = () => async dispatch => {
    const response = await csrfFetch('/api/users');
    const data = await response.json();
    dispatch(addUsers(data));
}

export const fetchUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)
    const data = await response.json();
    dispatch(addUser(data));
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

function usersReducer(state={}, action) {
    const newState = {...state};
    
    const byId = state["byId"] ? {...state["byId"]}:{};
    const allIds = state["allIds"] ? state["allIds"]:[];

    switch(action.type) {
        
        case ADD_USER:
            const user = action.payload.user;
            // newState[user.id] = user;
            const newbyId = {...byId, [user.id]: user};

            if(!allIds.includes(user.id)) allIds.push(user.id);
            
            return {"byId": newbyId, "allIds": allIds}

        case UPDATE_USER:
            const {id, bio, education, work, hobbies, birthday } = action.payload.user;

            const existingUser = Object.values(byId).find(user => user.id === id)
            console.log('existingUser ', existingUser)
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