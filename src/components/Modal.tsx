import React from 'react';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto flex bg-black bg-opacity-40" onClick={() => setIsOpen(false)}>
            <div className="relative p-4 text-white bg-[#242424] w-full max-w-md m-auto flex-col flex rounded-lg" onClick={(e) => e.stopPropagation()}>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
