import React, { useState } from 'react';
import Modal from './Modal';
import { TaskObj } from '../../types';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';

interface ModalTaskActivitiesProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskObj;
}

const ModalTaskActivities: React.FC<ModalTaskActivitiesProps> = ({ isModalOpen, setIsModalOpen, task }) => {

    const TaskActivity = () => (
        <div className="flex items-center gap-2 z-10">
            <div>
                <div className="rounded-full bg-yellow-500 p-2">
                    <FaPencilAlt size={'14px'} color={'white'} className="cursor-pointer" />
                </div>
            </div>

            <div className="flex-1 text-[16px] bg-[#1A1A1A] p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <span>curlos</span> <span className="text-[#6D6D6D]">changed the time</span>
                    </div>
                    <div className="text-[#6C6C6C]">just now</div>
                </div>

                <div className="text-[#6D6D6D]">The time has been removed.</div>
            </div>
        </div>
    );
    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles=" bg-[#242424] max-w-2xl">
                <div>
                    <div className="flex justify-between items-center mb-10">
                        <div></div>
                        <div className="text-[20px] ml-4">Task Activities</div>
                        <FaTimes size={'18px'} color={'white'} className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-line"></div>

                        <div className="">
                            <TaskActivity />
                            <TaskActivity />
                            <TaskActivity />
                            <TaskActivity />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalTaskActivities;