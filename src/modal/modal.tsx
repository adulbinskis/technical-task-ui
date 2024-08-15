import React from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

type Props = {
    modalOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const modalRoot = document.getElementById('portal')!;

const Modal: React.FC<Props> = ({ modalOpen, children, onClose }) => {
    if (!modalOpen) return null;

    return createPortal(
        <div className="custom-modal">
            <div className="custom-modal__overlay" onClick={onClose}></div>
            <div className="custom-modal__dialog">
                <div className="custom-modal__content">
                    <div className="custom-modal__header">
                        <h5 className="custom-modal__title">{"<)=_=)>"}</h5>
                        <button type="button" className="custom-modal__close-btn" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="custom-modal__body">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
