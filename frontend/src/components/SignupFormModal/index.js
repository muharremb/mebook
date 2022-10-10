import React, {useState} from 'react';
import SignupForm from './SignupForm';
import {Modal} from '../../context/Modal';
import './SignupModal.css';

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="signup-modal-contaier">
            <button id="create-new-user-button" onClick={() => setShowModal(true)}>Create New User</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </div>
    );
}

export default SignupFormModal;
