import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBar = ({ onSetLocation }) => {
    return (
        <div className="bg-white border-b border-gray-100 py-2 px-4">
            <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                    <MapPin className="text-kfc-red w-3.5 h-3.5" strokeWidth={3} />
                    <span className="text-[14px] font-bold text-[#202124]">
                        Allow location access for local store menu and promos
                    </span>
                </div>
                <button
                    onClick={onSetLocation}
                    className="bg-[#202124] text-white text-[12px] font-bold px-6 py-2 rounded-full hover:bg-black transition-all active:scale-95"
                >
                    Set Location
                </button>
            </div>
        </div>
    );
};

export default LocationBar;
