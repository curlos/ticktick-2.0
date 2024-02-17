import { Link } from "react-router-dom";
import IconsBar from "./IconsBar";
import { FaEllipsisH } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";

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

const TaskListPage = () => {
    const allTasks = useSelector((state) => state.tasks.tasks);

    return (
        <div className="w-h-screen min-h-screen flex flex-col items-center bg-black text-white">
            <div className="flex flex-col flex-1 container pt-6">
                <TopBar />

                <div className="mt-10 flex flex-col gap-3">
                    <TaskList listName={'High Priority'} tasks={allTasks} />
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