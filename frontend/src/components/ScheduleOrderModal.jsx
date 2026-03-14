import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronDown } from 'lucide-react';

const ScheduleOrderModal = ({ isOpen, onClose, onBack, location, orderType = 'Delivery', onConfirm }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-[800px] bg-white rounded-[20px] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="relative border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                            <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                                <ChevronLeft className="w-5 h-5 text-kfc-black" />
                            </button>
                            <h2 className="text-[22px] font-[900] text-[#202124] uppercase tracking-tight font-condensed">
                                SCHEDULE ORDER
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-kfc-black" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-12 py-10 space-y-12">
                            {/* Order Type */}
                            <div className="space-y-4">
                                <h3 className="text-[14px] font-[900] text-[#202124] uppercase tracking-tight">ORDER TYPE</h3>
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                    <span className="text-[15px] font-medium text-gray-700">{orderType}</span>
                                    <button onClick={onBack} className="text-[13px] font-black text-kfc-black underline uppercase">Edit</button>
                                </div>
                            </div>

                            {/* Your Location */}
                            <div className="space-y-4">
                                <h3 className="text-[14px] font-[900] text-[#202124] uppercase tracking-tight">YOUR LOCATION</h3>
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                    <span className="text-[15px] font-medium text-gray-700 truncate mr-8">
                                        {location || 'Bangalore, Karnataka, India'}
                                    </span>
                                    <button onClick={onBack} className="text-[13px] font-black text-kfc-black underline uppercase">Edit</button>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="space-y-4">
                                <h3 className="text-[14px] font-[900] text-[#202124] uppercase tracking-tight">SCHEDULE FOR YOUR ORDER</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                                        <div className="border-b border-gray-300 pb-2">
                                            <span className="text-[15px] font-bold text-kfc-black">Today</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                                        <div className="border-b border-gray-300 pb-2 flex items-center justify-between cursor-pointer group">
                                            <span className="text-[15px] font-bold text-kfc-black">ASAP</span>
                                            <ChevronDown className="w-4 h-4 text-kfc-black group-hover:text-kfc-red transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="px-12 pb-12 flex justify-center">
                            <button
                                onClick={() => onConfirm?.()}
                                className="bg-[#202124] text-white text-[14px] font-[900] uppercase px-16 py-4 rounded-full hover:bg-black transition-all shadow-lg active:scale-95"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ScheduleOrderModal;
