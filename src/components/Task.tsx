import { useState } from "react";
import { FaRegSquare, FaSquareCheck, FaChevronDown, FaChevronLeft, FaRegStar, FaStopwatch, FaListCheck } from "react-icons/fa6";
import { millisecondsToHoursAndMinutes } from "../utils/Helpers";
import { useNavigate } from "react-router-dom";
import { tasks } from "../utils/Tasks";

interface TaskComponentProps {
    taskId: string;
}

const Task: React.FC<TaskComponentProps> = ({ taskId }) => {
    if (!taskId) {
        return null;
    }

    const task = tasks[taskId];

    const { id, title, directSubtasks, uppermostTask, completedPomodoros, timeTaken, estimatedDuration, deadline } = task;

    const [completed, setCompleted] = useState(task.completed);
    // const [subtasks, setSubtasks] = useState(directSubtasks);
    const [showSubtasks, setShowSubtasks] = useState(false);

    const formattedTimeTaken = millisecondsToHoursAndMinutes(timeTaken);
    const formattedEstimatedDuration = millisecondsToHoursAndMinutes(estimatedDuration);
    const navigate = useNavigate();

    return (
        <div className={`text-white bg-[#242424] ${uppermostTask ? 'p-5' : 'pt-5 pl-8'}`}>
            <div onClick={() => navigate(`/tasks/${id}`)} className="gap-3 cursor-pointer">
                <div className="w-full flex justify-between">
                    <div className="flex gap-3">
                        <div className="cursor-pointer" onClick={() => setCompleted(!completed)}>
                            {!completed ? (
                                <FaRegSquare size={'20px'} color={'gray'} />
                            ) : (
                                <FaSquareCheck size={'20px'} color={'gray'} />
                            )}
                        </div>
                        <div className="mt-[-3px] text-[#7C7C7C] text-[15px]">
                            <div className={`${completed ? 'text-[#7C7C7C] line-through' : 'text-white'} text-[17px]`}>{title}</div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <span className="pl-4" onClick={(e) => {
                            e.stopPropagation();
                            setShowSubtasks(!showSubtasks);
                        }}>
                            {showSubtasks ? (
                                <FaChevronDown size={'15px'} color={'gray'} />
                            ) : (
                                <FaChevronLeft size={'15px'} color={'gray'} />
                            )}
                        </span>
                    </div>
                </div>

                <div className="pl-9 text-[#7C7C7C] flex justify-between">
                    <div className="flex gap-[4px] items-center">
                        {deadline && <span className="mr-2 text-[#FF7D01]">{deadline}</span>}

                        {completedPomodoros !== 0 && (
                            <>
                                <FaRegStar size={'15px'} color={'gray'} />
                                <span className="text-[#7C7C7C] text-[15px] mr-1">{completedPomodoros}</span>
                            </>
                        )}

                        {timeTaken !== 0 && (
                            <>
                                <FaStopwatch size={'15px'} color={'gray'} />
                                <span className="text-[#7C7C7C] text-[15px] mr-1">
                                    {formattedTimeTaken.hours ? `${formattedTimeTaken.hours}h` : ''}
                                    {formattedTimeTaken.minutes ? `${formattedTimeTaken.minutes}m` : ''}

                                    {estimatedDuration && (
                                        <span className="text-[#7C7C7C] text-[15px] mr-1">
                                            /{formattedEstimatedDuration.hours ? `${formattedEstimatedDuration.hours}h` : ''}
                                            {formattedEstimatedDuration.minutes ? `${formattedEstimatedDuration.minutes}m` : ''}
                                        </span>
                                    )}
                                </span>
                            </>
                        )}

                        <FaListCheck size={'15px'} color={'gray'} />
                        <span className="text-[#7C7C7C] text-[15px] mx-[2px]">0/4</span>
                    </div>

                    <div>
                        Hello Mobile
                    </div>
                </div>
            </div>

            {showSubtasks && directSubtasks.map((subtaskId) => (
                <Task key={subtaskId} taskId={subtaskId} />
            ))}
        </div>
    );
};

export default Task;