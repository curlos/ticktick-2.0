import { useState } from 'react';
import IconsBar from './IconsBar';
import { FaChevronLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


const SimpleFocusRecord = () => {
    return (
        <div>

        </div>
    );
};

const FocusRecordsList = () => {
    return (
        <div>

        </div>
    );
};

const TopBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center">
            <Link to="/focus" className="cursor-pointer">
                <FaChevronLeft size={'20px'} color={'#999999'} />
            </Link>

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
            <div className="flex flex-col flex-1 container pt-6">
                <TopBar />

                <FocusRecordsList />
            </div>
            <IconsBar />
        </div>
    );
};

export default FocusRecordsPage;