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
    const newState = {...state};
    
    const byId = state["byId"] ? {...state["byId"]}:{};
    const allIds = state["allIds"] ? state["allIds"]:[];

    switch(action.type) {
        case ADD_USER:
            const user = action.payload.user;
            // newState[user.id] = user;
            const newbyId = {...byId, [user.id]: user};
            allIds.push(user.id);
            console.log('action.payload ', user);
            return {"byId": newbyId, "allIds": allIds}

            // return {
            //     ["byId"]: { ...newState["byId"], [user.id]: user },
            // };
        case ADD_USERS: 
            const users = action.payload;
            return {...state, ...users};
        default:
            return state;
    }
}

export default usersReducer;