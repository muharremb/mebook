import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
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

    const handleSubmit = e => {
        e.preventDefault()
        if(content) {
            dispatch(createPost(content));
            setContent('');
        }
    }

    return (
        <div className='post-form-div'>
            <img src={prob.imgURL} /> 
            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    id="postContent" 
                    value={content} 
                    placeholder="What is on your mind?"
                    onChange={onContentChanged} />
                        <button type="button" onClick={onSavePostClicked}></button>
                </form>
            </div>
        </div >
    )
}

export const PostModal = (prob) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    
    const onContentChanged = e => setContent(e.target.value);
    
    const onSavePostClicked = () => {
        if(content) {
            dispatch(createPost(content));
            setContent('');
            prob.setShowModalFnc(false);
        }
    }

    return (
        <div className="post-modal-div">
            <h1>Create a post</h1>
            <hr />
            <div className="user-pic-name">
                <img src={prob.userProfile.photo} width="50px" height="50px" />
                <h2>{prob.userProfile.firstName} {prob.userProfile.lastName}</h2>
            </div>
            
            <div className="textarea-div">
                <textarea onChange={onContentChanged} name="post-text" placeholder='What is on your mind?'></textarea>
            </div>
            <div className="post-button-div">
                <button onClick={onSavePostClicked}>Post</button>
            </div>
        </div>    
    )
}

export default AddPostForm;