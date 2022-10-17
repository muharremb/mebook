import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../../store/users';

import './EditProfileModal.css';

const EditUserForm = ({userId}) => {

    const dispatch = useDispatch();
    const usersById = useSelector(state => state.users.byId ? state.users : {byId: {}});
    const userProfile = usersById.byId[userId];

    const [bio, setBio] = useState(userProfile.bio ? userProfile.bio : '')
    const [education, setEducation] = useState(userProfile.education ? userProfile.education : '')
    const [work, setWork] = useState(userProfile.work ? userProfile.work : '')
    const [hobbies, setHobbies] = useState(userProfile.hobbies ? userProfile.hobbies : '')
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        // console.log({userId, bio, education, work, hobbies});
        dispatch(userActions.editUser({userId, bio, education, work, hobbies}));
        // setBio('');
        // setEducation('');
        // setWork('');
        // setHobbies('');
    }
    
    return ( 
        <div className="edit-user-form-container">
            <h1>Edit User Form</h1>
            <form className="edit-user-form" onSubmit={handleSubmit}>
                    <input type="text" 
                        className="user-details"
                        placeholder= "bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}/>
                
                    <input type="text" 
                        className="user-details"
                        placeholder="education" 
                        value={education}
                        onChange={e => setEducation(e.target.value)}/>
                
                    <input type="text" 
                        className="user-details" 
                        placeholder="work"
                        value={work}
                        onChange={e => setWork(e.target.value)}/>
                
                    <input type="text" 
                        className="user-details"
                        placeholder="hobbies" 
                        value={hobbies}
                        onChange={e => setHobbies(e.target.value)}/>
                    
                    <button>Save</button>
            </form>
        </div>

     );
}
 
export default EditUserForm;