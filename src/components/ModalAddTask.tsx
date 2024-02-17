import Modal from './Modal';
import TextareaAutosize from 'react-textarea-autosize';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegFlag } from 'react-icons/fa6';
import { useState } from 'react';

interface ModalAddTaskProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            <TextareaAutosize className="text-[20px] placeholder:text-[#7C7C7C] font-bold mb-0 bg-transparent w-full outline-none resize-none" placeholder="What would you like to do?"></TextareaAutosize>
            <TextareaAutosize className="text-[16px] placeholder:text-[#7C7C7C] mb-4 bg-transparent w-full outline-none resize-none" placeholder="Description"></TextareaAutosize>
            <div className="flex items-center gap-3">
                {selectedDate ? (
                    <div className="flex items-center gap-1">
                        <FaCalendarAlt size={'18px'} color={'#E1312F'} />
                        <p>Today</p>
                    </div>
                ) : (
                    <FaCalendarAlt size={'18px'} color={'gray'} />
                )}
                <FaRegFlag size={'16px'} color={'gray'} />
            </div>
        </Modal>
    );
};

export default ModalAddTask;