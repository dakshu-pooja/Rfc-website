import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner = () => {
    return (
        <div className="bg-white py-2 border-b border-gray-100 hidden md:block">
            <div className="max-w-[1240px] mx-auto px-4 flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#e4002b] fill-[#e4002b]" />
                    <span className="text-[13px] font-bold text-kfc-black">
                        Allow location access for local store menu and promos
                    </span>
                </div>
                <button className="bg-[#202124] text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-2.5 rounded-full hover:bg-black transition-colors shadow-sm ml-2">
                    Set Location
                </button>
            </div>
        </div>
    );
};

export default LocationBanner;
