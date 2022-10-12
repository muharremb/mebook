import csrfFetch from "./csrf";

const ADD_USER = 'users/addUser';
const ADD_USERS = 'users/addUsers';

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

export const fetchUsers = () => async dispatch => {
    const response = await csrfFetch('/api/users');
    const data = await response.json();
    dispatch(addUsers(data));
}

export const fetchUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)
    const data = await response.json();
    dispatch(addUser(data));
    console.log('fetchUser data ', data);
}

function usersReducer(state={}, action) {
    const newState = {...state}
    switch(action.type) {
        case ADD_USER:
            const user = action.payload;
            newState[user.id] = user;
            return {
                ["byId"]: { ...newState["byId"], [user.id]: user },
                // ["allIds"]: {...newState["allIds"], [user.id]} 
            };
        case ADD_USERS: 
            const users = action.payload;
            return {...state, ...users};
        default:
            return state;
    }
}

export default usersReducer;