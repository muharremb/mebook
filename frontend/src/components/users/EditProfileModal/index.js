import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../../store/users';
import { Modal } from "../../../context/Modal";

import './EditProfileModal.css';

const EditUserForm = ({userId, setShowModalFnc}) => {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => Object.values(state.users).find((row) => row.id === userId))

    const [bio, setBio] = useState(userProfile.bio ? userProfile.bio : '')
    const [education, setEducation] = useState(userProfile.education ? userProfile.education : '')
    const [work, setWork] = useState(userProfile.work ? userProfile.work : '')
    const [hobbies, setHobbies] = useState(userProfile.hobbies ? userProfile.hobbies : '')
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(userActions.editUser({userId, bio, education, work, hobbies}));
        // setBio('');
        // setEducation('');
        // setWork('');
        // setHobbies('');
        setShowModalFnc(false);
    }
    
    return ( 
        <div className="edit-user-form-container">
            <h1>Edit Profile</h1>
            <hr />
            <form className="edit-user-form" >
                    <label htmlFor="bio">Bio</label>
                    <input 
                        id="bio"
                        className="user-details"
                        placeholder= "bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}/>
                
                    <label htmlFor="education">Education</label>
                    <input type="text"
                        id="education"
                        className="user-details"
                        placeholder="education" 
                        value={education}
                        onChange={e => setEducation(e.target.value)}/>
                
                    <label htmlFor="work">Work</label>
                    <input type="text"
                        id="work" 
                        className="user-details" 
                        placeholder="work"
                        value={work}
                        onChange={e => setWork(e.target.value)}/>
                    
                    <label htmlFor="hobbies">Hobbies</label>
                    <input type="text"
                        id="hobbies" 
                        className="user-details"
                        placeholder="hobbies" 
                        value={hobbies}
                        onChange={e => setHobbies(e.target.value)}/>
                    <div className="buttons-div">
                        <button onClick={handleSubmit}>Save</button>
                        <button onClick={() => setShowModalFnc(false)}>Cancel</button>
                    </div>
            </form>
        </div>
     );
}

export const EditUserFormModal = ({userId}) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div className="edit-form-modal-button-div">
            <button className="edit-form-modal-button" onClick={() => setShowModal(true)}>Edit Profile</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditUserForm userId={userId} setShowModalFnc={setShowModal}/>
                    </Modal>
            )}
        </div>
    )
}


 
export default EditUserForm;