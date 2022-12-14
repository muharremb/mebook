import csrfFetch from "./csrf";


const ADD_POST = 'posts/addPost';
const ADD_POSTS = 'posts/addPosts';
const REMOVE_POST = 'posts/removePost';
const UPDATE_POST = 'posts/updatePost';

const addPost = post => ({
    type: ADD_POST,
    payload: post
})

const removePost = post => ({
    type: REMOVE_POST,
    payload: post
})

const updatePost = post => ({
    type: UPDATE_POST,
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

export const editPost = (post) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            body: post.body
        })
    })
    const data = await response.json()
    dispatch(updatePost(data))
}

export const deletePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(removePost(postId));
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
            const newbyId = {...byId, ...action.payload.posts}

            Object.keys(action.payload.posts).map((post) => {
                if (!allIds.includes(post.id)) allIds.push(post.id)
            })
            return {"byId": newbyId, "allIds": allIds}
        case ADD_POST:
            const post = action.payload.post;
            const newById = {...byId, [post.id]: post}

            if(!allIds.includes(post.id)) allIds.push((post.id).toString());

            return {"byId": newById, "allIds": allIds}
        case UPDATE_POST:
            const {id, body, authorId} = action.payload;
            const existingPost = Object.values(byId).find(post => post.id === id);

            if(existingPost) {
                existingPost.body = body;
            }
            return newState;
        
        case REMOVE_POST:
            const postId = action.payload;
            
            delete byId.postId;
            const {[postId]: _remove, ...newByIds} = byId 
            const newAllIds = allIds.filter(item => item !== postId.toString());
            
            return {"byId": newByIds, "allIds": newAllIds}

        default:
            return state;
    }
}

export default postsReducer;

export const getUserPosts = userId => state => (
    Object.values(state.posts.byId)
    .filter(post => post.authorId === userId)
)