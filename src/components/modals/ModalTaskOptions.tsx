import React from 'react';
import Modal from './Modal';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegFlag, FaArrowUp } from 'react-icons/fa6';
import { useState } from 'react';
import TooltipPriorities from '../TooltipPriorities';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store';
import { FaArrowUpRightFromSquare, FaRegTrashCan, FaCodeBranch, FaList, FaRegCommentDots } from 'react-icons/fa6';
import { FaEllipsisH } from 'react-icons/fa';
import { FiXSquare } from 'react-icons/fi';
import { AiFillPushpin } from 'react-icons/ai';
import { TaskObj } from '../../types';
import { RiFocus3Line } from 'react-icons/ri';
import ModalStartFocus from './ModalStartFocus';
import ModalAddTask from './ModalAddTask';
import ModalTaskActivities from './ModalTaskActivities';
import ModalTaskComments from './ModalTaskComments';

interface ModalTaskOptionsProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskObj;
}

const ModalTaskOptions: React.FC<ModalTaskOptionsProps> = ({ isModalOpen, setIsModalOpen, task }) => {
    const [isModalAddTaskOpen, setIsModalAddTaskOpen] = useState(false);
    const [isModalStartFocusOpen, setIsModalStartFocusOpen] = useState(false);
    const [isModalTaskActivitiesOpen, setIsModalTaskActivitiesOpen] = useState(false);
    const [isModalTaskCommentsOpen, setIsModalTaskCommentsOpen] = useState(false);

    interface OptionProps {
        IconComponent: any;
        size?: string;
        textColor?: string;
        color: string;
        text: string;
        onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    }

    const MainOption: React.FC<OptionProps> = ({ IconComponent, size, color, text, onClick }) => (
        <div className="text-center cursor-pointer" onClick={onClick}>
            <div className="flex justify-center bg-[#303030] p-4 rounded-xl mb-2">
                <IconComponent size={size ? size : '25px'} color={color ? color : '#E1312F'} />
            </div>
            <div>{text}</div>
        </div>
    );

    const SideOption: React.FC<OptionProps> = ({ IconComponent, size, textColor, color, text, onClick }) => (
        <div className="cursor-pointer flex justify-between items-center gap-3" onClick={onClick}>
            <div className={textColor ? textColor : ''}>{text}</div>
            <IconComponent size={size ? size : '25px'} color={color ? color : '#E1312F'} />
        </div>
    );

    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles=" bg-[#242424] max-w-2xl">
                <div className="grid grid-cols-4 gap-10 px-3">
                    <MainOption IconComponent={AiFillPushpin} color="#FEAF00" textColor="text-[#D3D3D3]" text="Pin" />
                    <MainOption IconComponent={FaArrowUpRightFromSquare} color="#08CE9C" textColor="text-[#D3D3D3]" text="Share" />
                    <MainOption IconComponent={FiXSquare} color="#4772F9" textColor="text-[#D3D3D3]" text="Won't Do" />
                    <MainOption IconComponent={FaRegTrashCan} color="#E1312F" textColor="text-[#D3D3D3]" text="Delete" />
                </div>

                <div className="mt-8 p-4 rounded-lg bg-[#303030] flex flex-col gap-6">
                    <SideOption IconComponent={FaCodeBranch} size="20px" text="Add Subtask" color="#D5D5D5" onClick={() => setIsModalAddTaskOpen(true)} />
                    <SideOption IconComponent={RiFocus3Line} text="Start Focus" color="#D5D5D5" onClick={() => setIsModalStartFocusOpen(true)} />
                    <SideOption IconComponent={FaList} text="Task Activities" size="22px" color="#D5D5D5" onClick={() => setIsModalTaskActivitiesOpen(true)} />
                    <SideOption IconComponent={FaRegCommentDots} text="Comment" size="22px" color="#D5D5D5" onClick={() => setIsModalTaskCommentsOpen(true)} />
                </div>

                <div className="mt-8 p-4 rounded-lg bg-[#303030] flex flex-col justify-center gap-6">
                    <SideOption IconComponent={FaEllipsisH} text="More" size="18px" color="#D5D5D5" />
                </div>
            </Modal>

            <ModalAddTask isModalOpen={isModalAddTaskOpen} setIsModalOpen={setIsModalAddTaskOpen} />
            <ModalStartFocus isModalOpen={isModalStartFocusOpen} setIsModalOpen={setIsModalStartFocusOpen} task={task} />
            <ModalTaskActivities isModalOpen={isModalTaskActivitiesOpen} setIsModalOpen={setIsModalTaskActivitiesOpen} task={task} />
            <ModalTaskComments isModalOpen={isModalTaskCommentsOpen} setIsModalOpen={setIsModalTaskCommentsOpen} task={task} />
        </>
    );
};

export default ModalTaskOptions;