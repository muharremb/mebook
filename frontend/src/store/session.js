import csrfFetch from "./csrf";
import { fetchPosts } from "./posts";
import { fetchUser } from "./users";

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
        type: REMOVE_CURRENT_USER
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
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(fetchUser(data.user.id));
    dispatch(fetchPosts({author_id: data.user.id}))
    return response;
};

export const signup = (user) => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            first_name: user.firstName,
            last_name: user.lastName,
            gender: user.gender
        })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(fetchUser(data.user.id));
    
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
}

const storeCurrentUser = (user) => {

    const data = JSON.stringify(user);

    if (!user) sessionStorage.removeItem("currentUser");
    else sessionStorage.setItem("currentUser", data);
}

export function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if(csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const initialState = {
    currentUserId: JSON.parse(sessionStorage.getItem("currentUser"))
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUserId: action.payload};
        case REMOVE_CURRENT_USER:
            return {...state, currentUserId: null}
        default:
            return state
    }
};

export default sessionReducer;