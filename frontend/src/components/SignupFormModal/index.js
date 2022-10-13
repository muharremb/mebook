import React, {useState} from 'react';
import SignupForm from './SignupForm';
import {Modal} from '../../context/Modal';
import './SignupModal.css';

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = (e) => {
        setShowModal(false);
    }
    
    return (
        <div className="signup-modal-contaier">
            <button id="create-new-user-button" onClick={() => setShowModal(true)}>Create New Account</button>
            {showModal && (
                <Modal onClose={() => null}>
                    <div className='modal-signup-popup'>
                        <div className="x-image-signup-modal" onClick={handleModal}><i className="fa-solid fa-x"></i></div>  
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
