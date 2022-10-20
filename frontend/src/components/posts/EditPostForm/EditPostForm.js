import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editPost } from '../../../store/posts';
import { Modal } from '../../../context/Modal';

const EditPostForm = ({postId, onClose}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}});
    const post = Object.values(posts.byId).find(post => post.id === postId);
    
    const [content, setContent] = useState(post.body);

    const dispatch = useDispatch();
    const history = useHistory();

    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        console.log('post ', post);
        if(content) {
            post.body = content;
            dispatch(editPost(post));
        }
    }
    if (!post) return null;
    return (
        <div className="post-modal-div">
            <h1>Edit Post</h1>
            <hr />

            <div className="textarea-div">
                <textarea id="postContent" value={content} onChange={onContentChanged} name="post-text" placeholder='What is on your mind?'></textarea>
            </div>

            <div className="post-button-div">
                <button onClick={onSavePostClicked}>Post</button>
            </div>

            {/* <form>
                <input type="text" 
                id="postContent" 
                value={content} 
                onChange={onContentChanged}
                placeholder="whats on your mind" />
                
                <button type="button" id="save-post-button" onClick={onSavePostClicked}>Save Post</button>
            </form> */}
        </div>
    )
}

export const EditPostModal = ({onClose, postId}) => {
    return (
        <Modal onClose={() => onClose(false)}>
            <EditPostForm postId={postId} onClose={onClose}/>
        </Modal>
    )
}

export default EditPostForm;