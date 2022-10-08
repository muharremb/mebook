import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER,
    }
}

// thunk action creator

export const login = (user) => async (dispatch) => {
    const {email, password} = user;

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    return response;
};

// initialState is {currentUserId: userId}

const initialState = {
    currentUserId: null
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUserId: action.payload};
        case REMOVE_CURRENT_USER:
            return {...state, user: null}
        default:
            return state
    }
};

export default sessionReducer;