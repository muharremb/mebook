import React, { useEffect, useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import './Modal.css';

const ModelContext = React.createContext();

export const ModalProvider = ({children}) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModelContext.Provider value={value}>
                {children}
            </ModelContext.Provider>
            <div ref={modalRef}/>
        </>
    );
}

export function Modal ({onClose, children}) {
    const modalNode = useContext(ModelContext);
    if(!modalNode) return null;
    
    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}></div>
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}

