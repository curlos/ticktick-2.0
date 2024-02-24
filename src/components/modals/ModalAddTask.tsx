import Modal from './Modal';
import TextareaAutosize from 'react-textarea-autosize';
import { FaCalendarAlt, FaEllipsisH } from 'react-icons/fa';
import { FaRegFlag, FaArrowUp, FaTag } from 'react-icons/fa6';
import { useState } from 'react';
import TooltipPriorities from '../TooltipPriorities';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store';
import ModalDatePicker from './ModalDatepicker';
interface ModalAddTaskProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ isModalOpen, setIsModalOpen }) => {
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

    const [isModalDatePickerOpen, setIsModalDatePickerOpen] = useState(false);

    const handleAddTask = async () => {
        const payload = {
            title,
            description,
            priority: priority && priority.backendValue
        };

        console.log(payload);
        debugger;

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

    const handleIsModalOpen = () => {
        if (isModalDatePickerOpen) {
            setIsModalDatePickerOpen(false);
        } else if (isTooltipVisible) {
            setIsTooltipVisible(false);
        } else {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={handleIsModalOpen} modalBodyStyles={' max-w-lg'}>
                <div onClick={() => setIsTooltipVisible(false)}>
                    <TextareaAutosize className="text-[20px] placeholder:text-[#7C7C7C] font-bold mb-0 bg-transparent w-full outline-none resize-none" placeholder="What would you like to do?" value={title} onChange={(e) => setTitle(e.target.value)}></TextareaAutosize>
                    <TextareaAutosize className="text-[16px] placeholder:text-[#7C7C7C] mb-4 bg-transparent w-full outline-none resize-none" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></TextareaAutosize>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-5">
                            <div className="cursor-pointer" onClick={() => setIsModalDatePickerOpen(true)}>
                                {dueDate ? (
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt size={'18px'} color={'#E1312F'} className="cursor-pointer" />
                                        <p>Today</p>
                                    </div>
                                ) : (
                                    <FaCalendarAlt size={'18px'} color={'gray'} />
                                )}
                            </div>

                            <div>
                                <TooltipPriorities isTooltipVisible={isTooltipVisible} setPriority={setPriority} />
                                <FaRegFlag size={'16px'} color={priority && priority.flagColor ? priority.flagColor : 'gray'} className="cursor-pointer" onClick={(e: any) => {
                                    e.stopPropagation();
                                    setIsTooltipVisible(!isTooltipVisible);
                                }} />
                            </div>

                            <div className="cursor-pointer" onClick={() => setIsModalDatePickerOpen(true)}>
                                <FaTag size={'18px'} color={'gray'} />
                            </div>

                            <div className="cursor-pointer" onClick={() => setIsModalDatePickerOpen(true)}>
                                <FaEllipsisH size={'18px'} color={'gray'} />
                            </div>
                        </div>

                        <button className={`bg-orange-500 rounded-full p-2 self-end cursor-pointer` + (!title ? ' opacity-50' : '')} disabled={!title} onClick={handleAddTask}>
                            <FaArrowUp size={'14px'} color={'#292929'} />
                        </button>
                    </div>
                </div>
            </Modal>

            <ModalDatePicker isModalOpen={isModalDatePickerOpen} setIsModalOpen={setIsModalDatePickerOpen} dueDate={dueDate} setDueDate={setDueDate} />
        </>
    );
};

export default ModalAddTask;