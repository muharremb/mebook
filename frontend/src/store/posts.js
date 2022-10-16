import csrfFetch from "./csrf";


const ADD_POST = 'posts/addPost';
const ADD_POSTS = 'posts/addPosts';
const REMOVE_POST = 'posts/removePost';

const addPost = post => ({
    type: ADD_POST,
    payload: post
})

const removePost = post => ({
    type: REMOVE_POST,
    payload: post
})

const addPosts = posts => ({
    type: ADD_POSTS,
    payload: posts
})

export const createPost = (post) => async dispatch => {
    const response = await csrfFetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            body: post
        })
    });
    const data = await response.json();

    dispatch(addPost(data))
}

export const fetchPosts = filters => async dispatch => {
    const filterParams = new URLSearchParams(filters);
    const response = await csrfFetch(`/api/posts?${filterParams}`);
    const data = await response.json();
    dispatch(addPosts(data));
    return response;
}

function postsReducer(state={}, action) {
    const newState = {...state}

    const byId = state["byId"] ? {...state["byId"]}:{};
    const allIds = state["allIds"] ? state["allIds"]:[];

    switch (action.type) {
        case ADD_POSTS:
            // const newbyId = action.payload.posts;
            const newbyId = {...byId, ...action.payload.posts}
            // const newallIds = Object.keys(newbyId)

            Object.keys(action.payload.posts).map((post) => {
                if (!allIds.includes(post)) allIds.push(post)
            })
            return {"byId": newbyId, "allIds": allIds}
        default:
            return state;
    }
}

export default postsReducer;

// export const getUserPosts = userId => state => (
//     Object.values(state.posts)
//     .filter(post => post.userId === userId)
//     .map(post => ({
//         ...post,
//         author: state.users[post.authorId]?.username
//     }))
// )