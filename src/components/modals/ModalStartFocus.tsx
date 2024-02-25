import React, { useState } from 'react';
import Modal from './Modal';
import { TaskObj } from '../../types';
import { FaTimes } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';

interface ModalStartFocusProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskObj;
}

const ModalStartFocus: React.FC<ModalStartFocusProps> = ({ isModalOpen, setIsModalOpen, task }) => {
    const [selectedButton, setSelectedButton] = useState('stopwatch');

    const sharedButtonStyle = `py-1 px-4 rounded-3xl cursor-pointer`;
    const selectedButtonStyle = `${sharedButtonStyle} bg-[#3A2D20] text-[#F87A00] font-semibold`;
    const unselectedButtonStyle = `${sharedButtonStyle} text-[#666666]`;

    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles=" bg-[#242424]">
                <div>
                    <div className="flex justify-between items-center">
                        <div></div>
                        <div className="text-[20px] ml-4">Focus</div>
                        <FaTimes size={'18px'} color={'white'} className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center">
                            <div className="text-[14px] text-[#7B7B7B]">Estimation</div>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <div className="text-[20px]">40h</div>
                                <FaChevronRight size={'12px'} color={'#7B7B7B'} />
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-[14px] text-[#7B7B7B]">Duration</div>
                            <div className="text-[20px]">13h45m</div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-[14px] text-[#7B7B7B]">Pomo</div>
                            <div className="text-[20px]">8</div>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center gap-1">
                        <div className={selectedButton === 'pomo' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('pomo')}>Pomo</div>
                        <div className={selectedButton === 'stopwatch' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('stopwatch')}>Stopwatch</div>
                    </div>

                    <div className="my-[80px] text-center text-[48px] font-normal">
                        00:00
                    </div>

                    <div className="flex justify-center mb-4">
                        <button type="button" className={`bg-[#FF7D01] rounded-full py-3 px-10 text-white min-w-[200px]`} onClick={() => setIsModalOpen(false)}>
                            Start
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalStartFocus;