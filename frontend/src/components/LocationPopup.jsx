import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

const LocationPopup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed top-20 left-20 z-[300]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="bg-white rounded-[15px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-6 w-[360px]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-gray-800">online.kfc.co.in <span className="font-normal">wants to</span></h4>
                                    <p className="text-[14px] text-gray-600 mt-1">Know your location</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button onClick={onClose} className="w-full py-3 bg-blue-100/50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-sm transition-colors text-center">
                                Allow while visiting the site
                            </button>
                            <button onClick={onClose} className="w-full py-3 bg-blue-100/50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-sm transition-colors text-center">
                                Allow this time
                            </button>
                            <button onClick={onClose} className="w-full py-3 bg-blue-100/50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-sm transition-colors text-center">
                                Never allow
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LocationPopup;
