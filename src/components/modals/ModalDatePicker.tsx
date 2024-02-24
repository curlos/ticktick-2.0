import Modal from './Modal';
import TextareaAutosize from 'react-textarea-autosize';
import { FaAngleDoubleUp, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { FaRegFlag, FaArrowUp, FaChevronLeft, FaChevronRight, FaRegClock, FaBell, FaRepeat } from 'react-icons/fa6';
import TooltipPriorities from '../TooltipPriorities';
import { useEffect, useState } from 'react';
import { areDatesEqual } from '../../utils/Helpers';

interface ModalDatePickerProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dueDate: Date | null;
    setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const ModalDatePicker: React.FC<ModalDatePickerProps> = ({ isModalOpen, setIsModalOpen, dueDate, setDueDate }) => {
    const [selectedButton, setSelectedButton] = useState('date');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const sharedButtonStyle = `py-1 px-4 rounded-3xl cursor-pointer`;
    const selectedButtonStyle = `${sharedButtonStyle} bg-[#50361D] text-[#FF7D00]`;
    const unselectedButtonStyle = `${sharedButtonStyle} text-[#666666]`;
    const [tempDueDate, setTempDueDate] = useState(dueDate);

    const handleDone = () => {
        setDueDate(tempDueDate);
        setIsModalOpen(false);
    };

    return (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles={' max-w-lg'}>
            <div onClick={() => setIsTooltipVisible(false)} className="select-none">
                <div className="flex items-center justify-between">
                    <div className="text-[#FF7D00] cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</div>

                    <div className="flex gap-1 mx-[100px]">
                        <div className={selectedButton === 'date' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('date')}>Date</div>
                        <div className={selectedButton === 'duration' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('duration')}>Duration</div>
                    </div>

                    <div className="text-[#FF7D00] cursor-pointer" onClick={handleDone}>Done</div>
                </div>

                <div className="mt-6">
                    <Calendar dueDate={tempDueDate} setDueDate={setTempDueDate} />
                </div>

                <div className="mt-4">
                    <ExtraTimeOptions />
                </div>



                {/* <div>
                    <TooltipPriorities isTooltipVisible={isTooltipVisible} setPriority={setPriority} />
                    <FaRegFlag size={'16px'} color={priority && priority.flagColor ? priority.flagColor : 'gray'} className="cursor-pointer" onClick={(e: any) => {
                        e.stopPropagation();
                        setIsTooltipVisible(!isTooltipVisible);
                    }} />
                </div> */}
            </div>
        </Modal>
    );
};

interface CalendarProps {
    dueDate: Date | null;
    setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Calendar: React.FC<CalendarProps> = ({ dueDate, setDueDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setDueDate(new Date());
    }, []);

    function getCalendarMonth(year, month) {
        const calendar = [];
        // Get the first day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        // Adjusted to get the first day of the week (Monday in this case)
        let currentDay = new Date(firstDayOfMonth);
        const dayOfWeek = currentDay.getDay();
        // Adjust to get to the previous Monday, unless the first is a Monday
        currentDay.setDate(currentDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        // Get the last day of the month
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // Fill the calendar array with weeks
        // Stop if we've reached the end of the month and the current day is Monday
        do {
            const week = [];
            for (let i = 0; i < 7; i++) { // 7 days per week
                week.push(currentDay.getMonth() === month ? new Date(currentDay) : null);
                currentDay.setDate(currentDay.getDate() + 1);
            }
            calendar.push(week);
        } while (currentDay <= lastDayOfMonth || currentDay.getDay() !== 1); // Check for the first day of next week (Monday)

        return calendar;
    }

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const calendarMonth = getCalendarMonth(currentDate.getFullYear(), currentDate.getMonth());
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <FaChevronLeft size={'18px'} color={'gray'} className="cursor-pointer" onClick={goToPreviousMonth} />
                <div>{monthName} {currentDate.getFullYear()}</div>
                <FaChevronRight size={'18px'} color={'gray'} className="cursor-pointer" onClick={goToNextMonth} />
            </div>

            <table className="w-full">
                <thead>
                    <tr>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                            <th key={day + i} className="p-2">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {calendarMonth.map((week, index) => (
                        <tr key={`week-${index}`} className="mb-3">
                            {week.map((day, index) => {
                                return (
                                    <td key={`day-${index}`} className={`bg-transparent p-2 cursor-pointer` + (areDatesEqual(dueDate, day) ? ' bg-[#FF7D00] rounded-full' : '')} onClick={() => setDueDate(day)}>
                                        {day ? day.getDate() : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ExtraTimeOptions = () => {
    const [time, setTime] = useState(null);
    const [reminder, setReminder] = useState(null);
    const [repeat, setRepeat] = useState(null);

    const getColor = (selected: boolean | null) => {
        return selected ? 'text-[#FF7E00]' : 'text-[#828282]';
    };

    return (
        <div className="flex flex-col gap-6 p-4 bg-[#303030] rounded-lg">
            <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-2">
                    <FaRegClock size={'18px'} color={'#FF7E00'} />
                    <span className={`text-[#FF7E00]`}>Time</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`text-[#FF7E00]`}>10:00PM</span>
                    <FaTimes size={'18px'} color={'#FF7E00'} />
                </div>
            </div>

            <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-2">
                    <FaBell size={'18px'} color={reminder ? '#FF7E00' : '#828282'} />
                    <span className={`${getColor(reminder)}`}>Reminder</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`${getColor(reminder)}`}>None</span>
                    {reminder ? (
                        <FaTimes size={'18px'} color={'#FF7E00'} />
                    ) : (
                        <FaAngleDoubleUp size={'18px'} color={'gray'} />
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-2">
                    <FaRepeat size={'18px'} color={repeat ? '#FF7E00' : '#828282'} />
                    <span className={`${getColor(repeat)}`}>Repeat</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`${getColor(repeat)}`}>None</span>
                    {repeat ? (
                        <FaTimes size={'18px'} color={'#FF7E00'} />
                    ) : (
                        <FaAngleDoubleUp size={'18px'} color={'gray'} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalDatePicker;