import React from 'react';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalBodyStyles?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, modalBodyStyles, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto flex bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
            <div className={`relative p-4 text-white bg-[#292929] w-full max-w-md m-auto flex-col flex rounded-lg` + modalBodyStyles} onClick={(e) => e.stopPropagation()}>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
