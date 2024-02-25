import { FaSquareCheck, FaClock } from "react-icons/fa6";
import { FaHistory, FaChartBar } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

interface IconProps {
    IconComponent: React.ElementType;
    route: string;
    selected: boolean;
}

const Icon: React.FC<IconProps> = ({ IconComponent, route, selected }) => {
    return (
        <Link to={route}>
            <IconComponent size={'30px'} color={selected ? '#FF7D01' : '#666666'} />
        </Link>
    );
};

const IconsBar = () => {
    const location = useLocation();

    return (
        <div className="bg-black mx-10 flex justify-center gap-10 p-4 sticky bottom-0 w-full">
            <Icon IconComponent={FaSquareCheck} route="/tasks" selected={location.pathname === '/tasks'} />
            <Icon IconComponent={FaClock} route="/focus" selected={location.pathname === '/focus'} />
            <Icon IconComponent={FaHistory} route="/focus-records" selected={location.pathname === '/focus-records'} />
            <Icon IconComponent={FaChartBar} route="/focus-stats" selected={location.pathname === '/focus-stats'} />


        </div>
    );
};

export default IconsBar;