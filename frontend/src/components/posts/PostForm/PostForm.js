import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../store/posts';
import './PostForm.css';

const AddPostForm = (prob) => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const onContentChanged = e => setContent(e.target.value);
    const onSavePostClicked = () => {
        if(content) {
            dispatch(createPost(content));
            setContent('');
        }
    }
    return (
        <div className='post-form-div'>
            <img src={prob.imgURL} /> 
            <div className="post-form">
                <form>
                    <input type="text" 
                    id="postContent" 
                    value={content} 
                    placeholder="What is on your mind?"
                    onChange={onContentChanged} />
                    <button type="button" onClick={onSavePostClicked}>Save</button>
                </form>
            </div>
        </div >
    )
}

export default AddPostForm;