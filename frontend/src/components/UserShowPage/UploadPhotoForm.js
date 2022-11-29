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
        <div className="upload-photo-modal">
            <div className="update-profile-dialog">
                <h1>Update Profile Picture</h1>
            </div>

            <div className="upload">
                <form onSubmit={handleUpload} >
                    <div className="upload-label">
                        <label id="upload-select-photo">
                            Select Photo 
                            <input type="file" onChange={handleFile}/>
                        </label>
                    </div>
                    <div className="upload-submit">
                        <button type="submit" id="upload-photo-button">Upload Picture</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const UploadCoverPhotoForm = ({sessionUserProfile, close}) => {
    const [coverPhoto, setCoverPhoto] = useState(null);
    const dispatch = useDispatch();

    const handleFile = e => {
        const file = e.currentTarget.files[0];
        setCoverPhoto(file);
    }

    const handleUpload = async e => {
        e.preventDefault();

        const formData = new FormData();

        if(coverPhoto) {
            formData.append('user[cover_image]', coverPhoto);
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
        <div className="upload-photo-modal">
            <div className="update-profile-dialog">
                <h1>Update Cover Picture</h1>
            </div>

            <div className="upload">
                <form onSubmit={handleUpload} >
                    <div className="upload-label">
                        <label id="upload-select-photo">
                            Select Photo 
                            <input type="file" onChange={handleFile}/>
                        </label>
                    </div>
                    <div className="upload-submit">
                        <button type="submit" id="upload-photo-button">Upload Picture</button>
                    </div>
                </form>
            </div>
        </div>
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

export const UploadCoverPhotoModal = ({sessionUserProfile}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="upload-cover-photo" onClick={() => setShowModal(true)}>
                <button><i className="fa-solid fa-camera"></i> Edit Cover Photo </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadCoverPhotoForm sessionUserProfile={sessionUserProfile} close={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
 
export default UploadPhotoForm;
