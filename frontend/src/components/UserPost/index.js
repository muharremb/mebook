import React, { useState } from "react";
import './UserPost.css';

const UserPost = () => {
    const [post, setPost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        setPost('')
    }

    return ( 
        <div className="user-post-div">
            <div className="user-profile-photo-div">
                <i className="fa-regular fa-user fa-xl"></i>
            </div>
            <form>
                <input type="text"
                value = {post}
                onChange={(e) => setPost(e.target.value)}
                className="user-post" 
                placeholder={`What is on your mind?`}/>

                <button onClick={handleSubmit} type="submit"></button>
            </form>
        </div>
     );
}
 
export default UserPost;