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

interface ModalAddTaskProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskObj;
}

const ModalTaskOptions: React.FC<ModalAddTaskProps> = ({ isModalOpen, setIsModalOpen, task }) => {
    const dispatch = useDispatch();

    // useStates
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [priority, setPriority] = useState({
        name: 'No Priority',
        backendValue: null,
        flagColor: '#7B7B7B'
    });

    const handleAddTask = async () => {
        const payload = {
            title,
            description,
            priority: priority && priority.backendValue
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/add`, {
                method: 'POST', // Specify the request method
                headers: {
                    'Content-Type': 'application/json', // Indicate the type of content expected by the server
                },
                body: JSON.stringify(payload), // Send the data as a JSON string
            });

            if (!response.ok) {
                // If the server response is not ok, throw an error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json(); // Parse the JSON response
            dispatch(addTask(responseData)); // Dispatch an action to update the Redux store
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    interface OptionProps {
        IconComponent: any;
        size?: string;
        textColor?: string;
        color: string;
        text: string;
    }

    const MainOption: React.FC<OptionProps> = ({ IconComponent, size, color, text }) => (
        <div className="text-center cursor-pointer">
            <div className="flex justify-center bg-[#303030] p-4 rounded-xl mb-2">
                <IconComponent size={size ? size : '25px'} color={color ? color : '#E1312F'} />
            </div>
            <div>{text}</div>
        </div>
    );

    const SideOption: React.FC<OptionProps> = ({ IconComponent, size, textColor, color, text }) => (
        <div className="cursor-pointer flex justify-between items-center gap-3">
            <div className={textColor ? textColor : ''}>{text}</div>
            <IconComponent size={size ? size : '25px'} color={color ? color : '#E1312F'} />
        </div>
    );

    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles=" bg-[#242424]">
                <div className="grid grid-cols-4 gap-10 px-3">
                    <MainOption IconComponent={AiFillPushpin} color="#FEAF00" textColor="text-[#D3D3D3]" text="Pin" />
                    <MainOption IconComponent={FaArrowUpRightFromSquare} color="#08CE9C" textColor="text-[#D3D3D3]" text="Share" />
                    <MainOption IconComponent={FiXSquare} color="#4772F9" textColor="text-[#D3D3D3]" text="Won't Do" />
                    <MainOption IconComponent={FaRegTrashCan} color="#E1312F" textColor="text-[#D3D3D3]" text="Delete" />
                </div>

                <div className="mt-8 p-4 rounded-lg bg-[#303030] flex flex-col gap-6">
                    <SideOption IconComponent={FaCodeBranch} size="20px" text="Add Subtask" color="#D5D5D5" />
                    <SideOption IconComponent={RiFocus3Line} text="Start Focus" color="#D5D5D5" />
                    <SideOption IconComponent={FaList} text="Task Activities" size="22px" color="#D5D5D5" />
                    <SideOption IconComponent={FaRegCommentDots} text="Comment" size="22px" color="#D5D5D5" />
                </div>

                <div className="mt-8 p-4 rounded-lg bg-[#303030] flex flex-col justify-center gap-6">
                    <SideOption IconComponent={FaEllipsisH} text="More" size="18px" color="#D5D5D5" />
                </div>

                {/* <div onClick={() => setIsTooltipVisible(false)}>


                    <div className="flex justify-between">
                        <div className="bg-orange-500 rounded-full p-2 self-end cursor-pointer" onClick={handleAddTask}>
                            <FaArrowUp size={'14px'} color={'#292929'} />
                        </div>
                    </div>
                </div> */}
            </Modal>
        </>
    );
};

export default ModalTaskOptions;