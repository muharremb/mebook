import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editPost } from '../../../store/posts';

const EditPostForm = ({postId}) => {
    const posts = useSelector(state => state.posts.byId ? state.posts : {byId: {}});
    const post = Object.values(posts.byId).find(post => post.id === postId);
    
    const [content, setContent] = useState(post.body);

    const dispatch = useDispatch();
    const history = useHistory();

    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if(content) {
            dispatch(editPost(post))
        }
    }
    
    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <input type="text" 
                id="postContent" 
                value={content} 
                onChange={onContentChanged}
                placeholder="whats on your mind" />
                
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}

export default EditPostForm;