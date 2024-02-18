import Modal from './Modal';
import TextareaAutosize from 'react-textarea-autosize';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegFlag, FaArrowUp } from 'react-icons/fa6';
import TooltipPriorities from '../TooltipPriorities';
import { useState } from 'react';

interface ModalDatePickerProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dueDate: Date | null;
    setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const ModalDatePicker: React.FC<ModalDatePickerProps> = ({ isModalOpen, setIsModalOpen, dueDate, setDueDate }) => {
    const [selectedButton, setSelectedButton] = useState('date');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const sharedButtonStyle = `py-1 px-4 rounded-3xl cursor-pointer`;
    const selectedButtonStyle = `${sharedButtonStyle} bg-[#50361D] text-[#FF7D00]`;
    const unselectedButtonStyle = `${sharedButtonStyle} text-[#666666]`;

    return (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles={' max-w-4xl'}>
            <div onClick={() => setIsTooltipVisible(false)}>
                <div className="flex justify-between">
                    <div className="text-[#FF7D00]">Cancel</div>

                    <div className="flex gap-1 mx-[100px]">
                        <div className={selectedButton === 'date' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('date')}>Date</div>
                        <div className={selectedButton === 'duration' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('duration')}>Duration</div>
                    </div>

                    <div className="text-[#FF7D00]">Done</div>
                </div>



                {/* <div>
                    <TooltipPriorities isTooltipVisible={isTooltipVisible} setPriority={setPriority} />
                    <FaRegFlag size={'16px'} color={priority && priority.flagColor ? priority.flagColor : 'gray'} className="cursor-pointer" onClick={(e: any) => {
                        e.stopPropagation();
                        setIsTooltipVisible(!isTooltipVisible);
                    }} />
                </div> */}
            </div>
        </Modal>
    );
};

export default ModalDatePicker;