import { Link } from "react-router-dom";
import IconsBar from "./IconsBar";
import Task from "./Task";
import { FaEllipsisH } from "react-icons/fa";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { tasks } from "../utils/Tasks";
import { arrayToObjectByKey } from "../utils/Helpers";
import { TaskObjProps } from "../types";

const TopBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center">
            <Link to="/focus" className="cursor-pointer">
                <FaChevronLeft size={'20px'} color={'#999999'} />
            </Link>

            <div className="flex gap-1 mx-[100px] text-[20px]">
                Today
            </div>

            <div className="text-[#FE7C01]">
                <FaEllipsisH size={'20px'} color={'#999999'} />
            </div>
        </div>
    );
};

interface TaskListPageProps {
    tasks: {
        [key: string]: TaskObjProps;
    };
}

const TaskListPage: React.FC<TaskListPageProps> = ({ tasks }) => {

    return (
        <div className="w-h-screen min-h-screen flex flex-col items-center bg-black text-white">
            <div className="flex flex-col flex-1 container pt-6">
                <TopBar />

                <div className="mt-10 flex flex-col gap-3">
                    <TaskList listName={'High Priority'} tasks={tasks} />
                    {/* <TaskList listName={'Medium Priority'} tasks={highPriorityTasks} />
                    <TaskList listName={'Low Priority'} tasks={highPriorityTasks} />
                    <TaskList listName={'Completed'} tasks={highPriorityTasks} /> */}
                </div>
            </div>

            <IconsBar />
        </div>
    );
};

export default TaskListPage;