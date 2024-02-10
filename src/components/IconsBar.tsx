import { FaSquareCheck, FaClock } from "react-icons/fa6";

const IconsBar = () => {
    return (
        <div className="bg-black mx-10 flex justify-center gap-10 p-4">
            <FaSquareCheck size={'30px'} color={'white'} />
            <FaClock size={'30px'} color={'white'} />
        </div>
    );
};

export default IconsBar;