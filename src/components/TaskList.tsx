import Task from "./Task";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { useState } from "react";
import { TaskObjProps } from "../types";

interface TaskListProps {
    tasks: Array<TaskObjProps>;
    listName: string;
}

const TaskList: React.FC<TaskListProps> = ({ listName, tasks }) => {
    const [showTasks, setShowTasks] = useState(true);

    return (
        <div className="rounded-lg py-2 bg-[#242424]">
            {listName && (
                <div className="px-5 flex justify-between">
                    <div className="text-[#A7A7A7]">{listName}</div>
                    <div onClick={() => setShowTasks(!showTasks)} className="text-[#7C7C7C] flex items-center gap-2 cursor-pointer">
                        <div>4</div>
                        {showTasks ? (
                            <FaChevronDown size={'15px'} color={'gray'} />
                        ) : (
                            <FaChevronLeft size={'15px'} color={'gray'} />
                        )}
                    </div>
                </div>
            )}
            {showTasks && (
                <>
                    {tasks.map((task) => (
                        task.uppermostTask && <Task taskId={task.id} />
                    ))}
                </>
            )}
        </div>
    );
};

export default TaskList;