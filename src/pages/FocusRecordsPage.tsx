import { useState } from 'react';
import IconsBar from '../components/IconsBar';
import { FaChevronLeft, FaClock } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { TaskObj, Tasks } from '../types';


interface SimpleFocusRecord {
    task: TaskObj;
}

const SimpleFocusRecord: React.FC<SimpleFocusRecord> = ({ task }) => {
    const { title } = task;

    return (
        <div className="flex gap-2">
            <div>
                <div className="bg-[#FF7D01] p-2 rounded-full">
                    <FaClock size={'15px'} color={'white'} />
                </div>
            </div>

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

const FocusRecordsList = () => {
    const tasks: Tasks = {
        '1a781d9a-c4e4-461f-92cd-2b2b7358489e': {
            id: '1a781d9a-c4e4-461f-92cd-2b2b7358489e',
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
            id: '6b022e51-8c95-462e-9cc8-3bcd5f386798',
            title: 'Write comments',
            completed: false,
            directSubtasks: ['27366938-9da0-4ccf-97a6-a68817e5fb84'],
            completedPomodoros: 0,
            timeTaken: 0, // 13h45m
            estimatedDuration: 0
        },
        '27366938-9da0-4ccf-97a6-a68817e5fb84': {
            id: '27366938-9da0-4ccf-97a6-a68817e5fb84',
            title: '...rest',
            completed: false,
            directSubtasks: [],
            completedPomodoros: 0,
            timeTaken: 0, // 13h45m
            estimatedDuration: 0
        },
    };

    return (
        <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-4">
                <div>Feb 10</div>
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
            </div>

            <div className="flex flex-col gap-4">
                <div>Feb 8</div>
                <SimpleFocusRecord task={tasks['6b022e51-8c95-462e-9cc8-3bcd5f386798']} />
            </div>

            <div className="flex flex-col gap-4">
                <div>Feb 7</div>
                <SimpleFocusRecord task={tasks['27366938-9da0-4ccf-97a6-a68817e5fb84']} />
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
                <SimpleFocusRecord task={tasks['27366938-9da0-4ccf-97a6-a68817e5fb84']} />
                <SimpleFocusRecord task={tasks['27366938-9da0-4ccf-97a6-a68817e5fb84']} />
                <SimpleFocusRecord task={tasks['27366938-9da0-4ccf-97a6-a68817e5fb84']} />
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
                <SimpleFocusRecord task={tasks['27366938-9da0-4ccf-97a6-a68817e5fb84']} />
                <SimpleFocusRecord task={tasks['1a781d9a-c4e4-461f-92cd-2b2b7358489e']} />
            </div>
        </div>
    );
};

const TopBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center sticky top-0 py-6 bg-black">
            {/* <Link to="/focus" className="cursor-pointer">
                <FaChevronLeft size={'20px'} color={'#999999'} />
            </Link> */}

            <FaChevronLeft size={'20px'} color={'#999999'} className="cursor-pointer" onClick={() => history.back()} />

            <div className="flex gap-1 mx-[100px] text-[20px]">
                Focus Records
            </div>

            <div className="text-[#FE7C01]">
                Add
            </div>
        </div>
    );
};

const FocusRecordsPage = () => {
    return (
        <div className="w-h-screen min-h-screen flex flex-col items-center bg-black text-white">
            <div className="flex flex-col flex-1 container">
                <TopBar />


                <div className="mt-10">
                    <FocusRecordsList />
                </div>
            </div>
            <IconsBar />
        </div>
    );
};

export default FocusRecordsPage;