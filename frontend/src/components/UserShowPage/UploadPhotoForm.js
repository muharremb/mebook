import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import csrfFetch from "../../store/csrf";
import { fetchUser } from "../../store/users";

const UploadPhotoForm = ({sessionUserProfile, close}) => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const dispatch = useDispatch();

    const handleFile = e => {
        const file = e.currentTarget.files[0];
        setProfilePhoto(file);
    }

    const handleUpload = async e => {
        e.preventDefault();

        const formData = new FormData();

        if(profilePhoto) {
            formData.append('user[photo]', profilePhoto);
        }
        const res = await csrfFetch(`/api/users/${sessionUserProfile.id}`, {
            method: 'PUT',
            body: formData
        });
        const data = await res.json()
        dispatch(fetchUser(data.user.id));
        close(false);
    }
    return ( 
        <>
            <h2>Upload Profile Picture</h2>
            <form onSubmit={handleUpload} >
                <label>
                    Select Photo 
                    <input type="file" onChange={handleFile}/>
                </label>
                <button type="submit" id="upload-photo-button">Upload</button>
            </form>
        </>
    );
}

export const UploadPhotoModal = ({sessionUserProfile}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="upload-pic" onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-camera fa-2x"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadPhotoForm sessionUserProfile={sessionUserProfile} close={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
 
export default UploadPhotoForm;
