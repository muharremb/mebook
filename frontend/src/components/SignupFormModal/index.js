import React, {useState} from 'react';
import SignupForm from './SignupForm';
import {Modal} from '../../context/Modal';
import './SignupModal.css';

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="signup-modal-contaier">
            <button id="create-new-user-button" onClick={() => setShowModal(true)}>Create New Account</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='modal-signup-popup'>  
                        <h1>Sign Up</h1>
                        <h2>It is quick and easy.</h2>
                        <hr />
                        <SignupForm />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default SignupFormModal;
