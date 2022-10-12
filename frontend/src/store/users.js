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

function usersReducer(state={}, action) {
    switch(action.type) {
        case ADD_USER:
            const user = action.payload;
            return {...state, [user.id]: user};
        case ADD_USERS: 
            const users = action.payload;
            return {...state, ...users};
        default:
            return state;
    }
}

export default usersReducer;