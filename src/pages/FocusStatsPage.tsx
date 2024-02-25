import { Link } from "react-router-dom";
import IconsBar from "../components/IconsBar";
import { FaEllipsisH } from "react-icons/fa";
import { FaChevronLeft, FaArrowUpRightFromSquare, FaArrowUp, FaArrowDown, FaPlus, FaClock, FaChevronRight } from "react-icons/fa6";
import TaskList from "../components/TaskList";
import { useSelector } from "react-redux";
import { useState } from "react";

const TopBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center sticky top-0 py-6 bg-black">
            {/* <Link to="/focus" className="cursor-pointer">
                <FaChevronLeft size={'20px'} color={'#999999'} />
            </Link> */}
            <FaChevronLeft size={'20px'} color={'#FFF'} className="cursor-pointer" onClick={() => history.back()} />

            <div className="flex gap-1 mx-[100px] text-[20px]">
                Focus Statistics
            </div>

            <div className="text-[#FE7C01]">
                <FaArrowUpRightFromSquare size={'20px'} color={'#FFF'} />
            </div>
        </div>
    );
};

const BasicFocusStats = () => (
    <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1A1A1A] rounded-lg p-4">
            <div className="text-[18px] font-semibold">Today's Pomo</div>
            <div className="text-[#555555] text-[14px] flex gap-1 items-center">
                <div>0 from yesterday</div>
                <FaArrowUp size={'12px'} color={'#0FA67E'} />
            </div>
            <div className="font-semibold text-[40px] text-[#FF7D00]">0</div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
            <div className="text-[18px] font-semibold">Today's Focus (h)</div>
            <div className="text-[#555555] text-[14px] flex gap-1 items-center">
                <div>2h19m from yesterday</div>
                <FaArrowDown size={'12px'} color={'#DE3030'} />
            </div>
            <div className="font-semibold text-[40px] text-[#FF7D00]">
                <span>0</span>
                <span className="text-[20px] ml-[2px] mr-[8px]">h</span>
                <span>0</span>
                <span className="text-[20px] ml-[2px]">m</span>
            </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
            <div className="text-[18px] font-semibold">Total Pomos</div>
            <div className="font-semibold text-[32px] text-[#FF7D00] mt-2">1085</div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
            <div className="text-[18px] font-semibold">Total Focus Duration</div>
            <div className="font-semibold text-[32px] text-[#FF7D00] mt-2">
                <span>1880</span>
                <span className="text-[20px] ml-[2px] mr-[8px]">h</span>
                <span>55</span>
                <span className="text-[20px] ml-[2px]">m</span>
            </div>
        </div>
    </div>
);

const FocusRecordsPreview = () => (
    <div className="bg-[#1A1A1A] rounded-lg px-5 py-6">
        <div className="flex justify-between">
            <div>Focus Record</div>
            <FaPlus size={'20px'} color={'#FF7D00'} />
        </div>

        <div className="mt-4 flex gap-4">
            <div>
                <div className="bg-[#FF7D01] p-2 rounded-full">
                    <FaClock size={'15px'} color={'white'} />
                </div>
            </div>

            <div className="text-white rounded-lg w-full">
                <div className="flex gap-4 justify-between text-[#7C7C7C]">
                    <div className="flex gap-4">
                        <span className="text-white">Feb 23</span>
                        <span>3:13 PM - 3:58 PM</span>
                    </div>
                    <div>45m</div>
                </div>

                <div className="mt-2">
                    <div className="font-semibold">
                        <span>Project: TickTick 2.0 - Frontend</span>
                        <span className="text-[#7C7C7C] font-normal"> (Project: TickTick 2.0 - Frontend)</span>
                    </div>
                    <div className="text-[#7C7C7C]">Kept trying to sideload this app so I could have i...</div>
                </div>
            </div>
        </div>
    </div>
);

const Details = () => {
    const [selectedButton, setSelectedButton] = useState('stopwatch');

    const sharedButtonStyle = `py-1 px-4 rounded-3xl cursor-pointer`;
    const selectedButtonStyle = `${sharedButtonStyle} bg-[#3A2D20] text-[#F87A00] font-semibold`;
    const unselectedButtonStyle = `${sharedButtonStyle} text-[#666666]`;

    return (
        <div className="bg-[#1A1A1A] rounded-lg px-5 py-6">
            <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold">Details</div>
                <div className="flex items-center gap-1">
                    <FaChevronLeft size={'16px'} color={'#FF7D00'} />
                    <div>Feb</div>
                    <FaChevronRight size={'16px'} color={'#FF7D00'} />
                </div>
            </div>

            <div className="mt-5 flex justify-center gap-1">
                <div className={selectedButton === 'day' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('day')}>Day</div>
                <div className={selectedButton === 'week' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('week')}>Week</div>
                <div className={selectedButton === 'month' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('month')}>Month</div>
                <div className={selectedButton === 'custom' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('custom')}>Custom</div>
            </div>
        </div>
    );
};

const FocusStatsPage = () => {

    return (
        <div className="w-h-screen min-h-screen flex flex-col items-center bg-black text-white">
            <div className="flex flex-col flex-1 container">
                <TopBar />

                <div className="flex flex-col gap-3">
                    <BasicFocusStats />
                    <FocusRecordsPreview />
                    <Details />
                </div>

            </div>

            <IconsBar />
        </div>
    );
};

export default FocusStatsPage;