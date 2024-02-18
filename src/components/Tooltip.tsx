// Tooltip.js
import React from 'react';

interface TooltipProps {
    isVisible: boolean;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ isVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div className="absolute z-50 text-white bg-[#242424] border-2 border-[#202020] rounded-lg text-sm bottom-[43px]">
            {children}
        </div>
    );
};

export default Tooltip;