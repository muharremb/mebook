import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../store/posts';
import './PostForm.css';

const AddPostForm = () => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const onContentChanged = e => setContent(e.target.value);
    const onSavePostClicked = () => {
        if(content) {
            dispatch(createPost(content));
        }
        setContent('');
    }
    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <input type="text" id="postContent" value={content} onChange={onContentChanged} />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;