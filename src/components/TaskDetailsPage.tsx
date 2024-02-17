import { useEffect, useState } from 'react';
import IconsBar from './IconsBar';
import { FaChevronLeft, FaAnglesUp, FaRegSquare, FaSquareCheck, FaFlag, FaStopwatch, FaRegStar, FaListCheck, FaPlus } from 'react-icons/fa6';
import { FaEllipsisH } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TaskObj, Tasks } from '../types';
import { millisecondsToHoursAndMinutes } from '../utils/Helpers';
import TaskList from './TaskList';
import Task from './Task';
import { useSelector } from 'react-redux';


interface SimpleFocusRecord {
    task: TaskObj;
}

const SimpleFocusRecord: React.FC<SimpleFocusRecord> = ({ task }) => {
    const { title } = task;

    return (
        <div className="flex gap-2">
            <div className="text-white bg-[#242424] rounded-lg p-4 w-full">
                <div className="flex gap-4 justify-between text-[#7C7C7C]">
                    <div>3:13 PM - 3:58 PM</div>
                    <div>45m</div>
                </div>

                <div className="mt-4">
                    <div className="font-semibold">
                        <span>{title}</span>
                        {title !== 'Twitter 2.0' && <span className="text-[#7C7C7C] font-normal"> (Twitter 2.0)</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TopBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center">
            <Link to="/focus" className="cursor-pointer">
                <FaChevronLeft size={'20px'} color={'#999999'} />
            </Link>

            <div className="flex items-center gap-1 mx-[100px] text-[20px]">
                Side Projects
                <FaAnglesUp size={'15px'} color={'#999999'} />
            </div>

            <div className="text-[#FE7C01]">
                <FaEllipsisH size={'20px'} color={'#999999'} />
            </div>
        </div>
    );
};

const TaskDetailsPage = () => {
    const tasks = useSelector((state) => state.tasks.tasks);

    let { taskId } = useParams();
    let navigate = useNavigate();
    const [task, setTask] = useState<TaskObj>({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (!taskId || !tasks[taskId]) {
            navigate('/tasks');
        } else {
            setTask(tasks[taskId]);
            setCompleted(tasks[taskId].completed);
        }
    }, [taskId]);

    // If taskId is undefined or task does not exist, component will not render further
    if (!taskId || !tasks[taskId]) {
        return null;
    }

    const { _id, title, directSubtasks, completedPomodoros, timeTaken, estimatedDuration, deadline, description } = task;
    const formattedTimeTaken = millisecondsToHoursAndMinutes(timeTaken);
    const formattedEstimatedDuration = millisecondsToHoursAndMinutes(estimatedDuration);

    return (
        task ? (
            <div className="w-h-screen min-h-screen flex flex-col items-center bg-black text-white">
                <div className="flex flex-col flex-1 container pt-6">
                    <TopBar />

                    <div className="mt-4 flex justify-between gap-2">
                        <div className="cursor-pointer" onClick={() => setCompleted(!completed)}>
                            {!completed ? (
                                <FaRegSquare size={'20px'} color={'gray'} />
                            ) : (
                                <FaSquareCheck size={'20px'} color={'gray'} />
                            )}
                        </div>
                        <div>
                            {deadline ? (
                                <span className="mr-2 text-[#FF7D01]">{deadline}</span>
                            ) : (
                                <span className="text-[#7C7C7C]">Date & Repeat</span>
                            )}
                        </div>
                        <div>
                            <FaFlag size={'20px'} color={'#E1312F'} />
                        </div>
                    </div>

                    <div className="mt-3 bg-[#FF7D01] h-[3px]"></div>

                    <div className="mt-5">
                        <div className="flex gap-[4px] items-center">
                            <span className="text-[#7C7C7C] mr-2">Focused for</span>

                            {completedPomodoros !== 0 && (
                                <>
                                    <FaRegStar size={'15px'} color={'#FF7D01'} />
                                    <span className="text-[#FF7D01] text-[15px] mr-1">{completedPomodoros}</span>
                                </>
                            )}

                            {timeTaken !== 0 && (
                                <>
                                    <FaStopwatch size={'15px'} color={'#FF7D01'} />
                                    <span className="text-[#7C7C7C] text-[15px] mr-1">
                                        <span className="text-[#FF7D01]">
                                            {formattedTimeTaken.hours ? `${formattedTimeTaken.hours}h` : ''}
                                            {formattedTimeTaken.minutes ? `${formattedTimeTaken.minutes}m` : ''}
                                        </span>

                                        {estimatedDuration && (
                                            <span className="text-[#7C7C7C] text-[15px] mr-1">
                                                /{formattedEstimatedDuration.hours ? `${formattedEstimatedDuration.hours}h` : ''}
                                                {formattedEstimatedDuration.minutes ? `${formattedEstimatedDuration.minutes}m` : ''}
                                            </span>
                                        )}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mt-6">
                        <div className="text-[20px] font-bold">{task.title}</div>
                    </div>

                    {/* Description */}
                    <div className="text-[#7C7C7C] mt-1">
                        {description ? (
                            <div className="text-white">{description}</div>
                        ) : (
                            <div>Description</div>
                        )}
                    </div>

                    {directSubtasks && directSubtasks.length > 0 && (
                        <div className="rounded-lg mt-5 py-1 pr-5 bg-[#242424]">
                            {/* Subtasks  */}
                            {directSubtasks.map((subtaskId) => (
                                <Task key={subtaskId} tasks={tasks} taskId={subtaskId} />
                            ))}

                            <div className="flex items-center gap-2 px-8 pt-5 pb-3 text-[#FF7D01] bg-[#242424] cursor-pointer">
                                <FaPlus size={'15px'} color={'#FF7D01'} />
                                Add Subtask
                            </div>
                        </div>
                    )}

                </div>
                <IconsBar />
            </div >
        ) : (
            <div>Loading...</div>
        )
    );
};

export default TaskDetailsPage;