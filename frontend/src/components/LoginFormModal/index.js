import React, { useState } from "react";
import LoginForm from "./LoginForm";
import {Modal} from "../../context/Modal";

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onclose={() => setShowModal(false)}>
                    <LoginForm/>
                </Modal>
            )}
        </>
    );
}
 
export default LoginFormModal;