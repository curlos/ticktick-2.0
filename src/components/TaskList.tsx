import { useState } from "react";
import { FaRegSquare, FaSquareCheck, FaChevronDown, FaChevronRight, FaRegStar, FaStopwatch, FaListCheck } from "react-icons/fa6";
import IconsBar from "./IconsBar";

interface TaskComponentProps {
    taskId: string;
}

interface TaskObjProps {
    title: string,
    completed: boolean,
    directSubtasks: Array<string>,
    uppermostTask?: boolean,
    completedPomodoros: number,
    timeTaken: number,
    estimatedDuration: number;
    deadline: string;
}

interface Tasks {
    [key: string]: TaskObjProps;
}

const tasks: Tasks = {
    '1a781d9a-c4e4-461f-92cd-2b2b7358489e': {
        title: 'Twitter 2.0',
        completed: false,
        directSubtasks: ['6b022e51-8c95-462e-9cc8-3bcd5f386798'],
        uppermostTask: true,
        completedPomodoros: 8,
        timeTaken: 49500000, // 13h45m
        estimatedDuration: 144000000,
        deadline: 'Feb 7'
    },
    '6b022e51-8c95-462e-9cc8-3bcd5f386798': {
        title: 'Write comments',
        completed: false,
        directSubtasks: ['27366938-9da0-4ccf-97a6-a68817e5fb84'],
        completedPomodoros: 0,
        timeTaken: 0, // 13h45m
        estimatedDuration: 0
    },
    '27366938-9da0-4ccf-97a6-a68817e5fb84': {
        title: '...rest',
        completed: false,
        directSubtasks: [],
        completedPomodoros: 0,
        timeTaken: 0, // 13h45m
        estimatedDuration: 0
    },
};

const Task: React.FC<TaskComponentProps> = ({ taskId }) => {
    if (!taskId) {
        return null;
    }

    const taskObj = tasks[taskId];
    const { title, directSubtasks, uppermostTask, completedPomodoros, timeTaken, estimatedDuration, deadline } = taskObj;

    const [completed, setCompleted] = useState(taskObj.completed);
    // const [subtasks, setSubtasks] = useState(directSubtasks);
    const [showSubtasks, setShowSubtasks] = useState(false);

    return (
        <div className={`text-white bg-[#242424] rounded-lg ${uppermostTask ? 'p-5' : 'py-5 pl-8'}`}>
            <div className="flex gap-3">
                <span className="cursor-pointer" onClick={() => setCompleted(!completed)}>
                    {!completed ? (
                        <FaRegSquare size={'20px'} color={'gray'} />
                    ) : (
                        <FaSquareCheck size={'20px'} color={'gray'} />
                    )}
                </span>

                <div className="mt-[-3px] text-[#7C7C7C] text-[15px]">
                    <div className={`${completed ? 'text-[#7C7C7C] line-through' : 'text-white'} text-[17px]`}>{title}</div>

                    <div className="flex gap-[4px] items-center">
                        {deadline && <span className="mr-2">{deadline}</span>}

                        {completedPomodoros !== 0 && (
                            <>
                                <FaRegStar size={'15px'} color={'gray'} />
                                <span className="text-[#7C7C7C] text-[15px] mr-1">{completedPomodoros}</span>
                            </>
                        )}

                        {timeTaken !== 0 && (
                            <>
                                <FaStopwatch size={'15px'} color={'gray'} />
                                <span className="text-[#7C7C7C] text-[15px] mr-1">{timeTaken}</span>
                            </>
                        )}

                        <FaListCheck size={'15px'} color={'gray'} />
                        <span className="text-[#7C7C7C] text-[15px] mx-[2px]">0/4</span>
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <span onClick={() => setShowSubtasks(!showSubtasks)}>
                        {showSubtasks ? (
                            <FaChevronDown size={'15px'} color={'gray'} />
                        ) : (
                            <FaChevronRight size={'15px'} color={'gray'} />
                        )}
                    </span>
                </div>
            </div>

            {showSubtasks && directSubtasks.map((subtaskId) => (
                <Task key={subtaskId} taskId={subtaskId} />
            ))}
        </div>
    );
};

const TaskList = () => {
    return (
        <div className="w-h-screen min-h-screen flex flex-col bg-black">
            <div className="flex flex-1 justify-center items-center">
                <div className="container flex flex-col gap-4 xs:p-2 sm:p-4 xl:p-0">
                    <Task taskId={'1a781d9a-c4e4-461f-92cd-2b2b7358489e'} />
                </div>
            </div>
            <IconsBar />
        </div>
    );
};

export default TaskList;;