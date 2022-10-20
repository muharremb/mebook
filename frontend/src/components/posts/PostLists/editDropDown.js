import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../../store/posts";
import EditPostForm, { EditPostModal } from "../EditPostForm/EditPostForm";

const EditDropDownButton = ({post}) => {
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        if(!showMenu) return;
        
        const closeMenu = (e) => {
            // console.log('closeMenu e ', e.target);
            // setShowMenu(false);

            if(e.target.id !== "editPostModalDiv" && e.target.id !== "postContent") {
                setShowModal(false);
                setShowMenu(false);
            }

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

    const openEditPostModal = () => {
        setShowModal(true);
    }

    return ( 
        <div onClick={openMenu} className="edit-form-dropdown">
            <i className="fa-solid fa-ellipsis fa-xl" id="three-dots"></i>
            {showMenu && (
                <div className="edit-post-dropdown-items" id="myDropdown">
                    <div onClick={handleDeletePost} className="delete-post-div">Move to trash</div>
                    <div onClick={openEditPostModal} id="editPostModalDiv" className="edit-post-div">Edit a Post
                        {showModal && (
                                <EditPostModal onClose={() => setShowModal(false)} postId={post.id}/>
                            )}
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default EditDropDownButton;