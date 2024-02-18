import { FaRegFlag } from "react-icons/fa6";
import Tooltip from "./Tooltip";

interface TooltipPrioritiesProps {
    isTooltipVisible: boolean;
    setPriority: React.Dispatch<React.SetStateAction<{
        name: string;
        backendValue: null;
        flagColor: string;
    }>>;
}

const TooltipPriorities: React.FC<TooltipPrioritiesProps> = ({ isTooltipVisible, setPriority }) => {
    const priorities = {
        'High Priority': {
            name: 'High Priority',
            backendValue: 'high',
            flagColor: '#E1312F'
        },
        'Medium Priority': {
            name: 'Medium Priority',
            backendValue: 'medium',
            flagColor: '#FEB003'
        },
        'Low Priority': {
            name: 'Low Priority',
            backendValue: 'low',
            flagColor: '#4773F9'
        },
        'No Priority': {
            name: 'No Priority',
            backendValue: null,
            flagColor: '#7B7B7B'
        }
    };

    return (
        <div className={`${isTooltipVisible ? '' : 'hidden'} custom-tooltip-position`}>
            <Tooltip isVisible={isTooltipVisible}>
                <div className="flex flex-col">
                    {Object.values(priorities).map((priority) => (
                        <div key={priority.name} className="flex items-center gap-2 text-[16px] cursor-pointer p-4 hover:bg-[#353535]" onClick={() => setPriority(priority)}>
                            <FaRegFlag size={'18px'} color={priority.flagColor} />
                            {priority.name}
                        </div>
                    ))}
                </div>
            </Tooltip>
        </div>
    );
};

export default TooltipPriorities;