import React from 'react';

const KfcLogo = ({ className = "" }) => (
    <div className={`flex items-center gap-[6px] ${className}`}>
        {/* Three Red Stripes */}
        <div className="flex items-center gap-[6px]">
            <div className="w-[8px] h-[24px] bg-[#E4002B]"></div>
            <div className="w-[8px] h-[24px] bg-[#E4002B]"></div>
            <div className="w-[8px] h-[24px] bg-[#E4002B]"></div>
        </div>
        {/* KFC Text SVG */}
        <svg width="60" height="24" viewBox="24 6 42 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M34.4688 8.03125L28.8438 14.9375H28.7188V8.03125H25.3125V23.9688H28.7188V19.4375L30.2812 17.5L34.5625 23.9688H38.5L32.4062 14.8125L38.1875 8.03125H34.4688Z" fill="#E4002B" />
            <path d="M40.2188 8.03125H49.7812V11.0312H43.625V14.4375H49.2188V17.4375H43.625V23.9688H40.2188V8.03125Z" fill="#E4002B" />
            <path d="M61.875 12.3125C61.875 10.7188 61.125 9.53125 59.4375 9.53125C57.4375 9.53125 56.4062 11.25 56.4062 16C56.4062 20.75 57.3438 22.4688 59.5 22.4688C61.3438 22.4688 61.875 21.3438 61.875 19.3438H65.2812C65.2812 21.875 64.2188 24.3125 59.5312 24.3125C54.4062 24.3125 52.9688 20.375 52.9688 16C52.9688 11.625 54.4375 7.6875 59.4688 7.6875C64.6562 7.6875 65.2812 10.375 65.2812 12.3125H61.875Z" fill="#E4002B" />
        </svg>
    </div>
);

export default KfcLogo;
