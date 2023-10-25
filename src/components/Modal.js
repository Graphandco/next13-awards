"use client";
import { FaTimes } from "react-icons/fa";

const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className="modal">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="modal-wrapper"
            >
                <div className="modal-close">
                    <FaTimes onClick={onClose} />
                </div>
                <div className="modal-title">{title}</div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
