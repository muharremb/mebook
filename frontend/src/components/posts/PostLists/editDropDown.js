import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../../store/posts";


const EditDropDownButton = ({post}) => {
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    
    useEffect(() => {
        if(!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }

    const handleDeletePost = () => {
        dispatch(postActions.deletePost(post.id));
    }

    return ( 
        <button onClick={openMenu}>
            <i className="fa-solid fa-ellipsis fa-xl"></i>
            {showMenu && (
                <div className="edit-post-dropdown" id="myDropdown">
                <div onClick={handleDeletePost} className="delete-post-div">Move to trash</div>
                <div className="edit-post-div">Edit the Post</div>
            </div>
            )}
        </button>
     );
}
 
export default EditDropDownButton;