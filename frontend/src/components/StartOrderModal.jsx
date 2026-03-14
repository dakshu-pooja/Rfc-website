import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const StartOrderModal = ({ isOpen, onClose, onSelectDelivery, onSelectStore }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-[800px] rounded-[10px] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                            <h2 className="text-2xl font-[900] text-kfc-black uppercase tracking-tight">
                                START YOUR ORDER
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-kfc-black" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-12 md:p-16 flex flex-col items-center">
                            <h3 className="text-3xl md:text-4xl font-[900] text-kfc-black uppercase tracking-tight text-center mb-12 max-w-lg leading-tight">
                                HOW WOULD YOU LIKE TO RECEIVE YOUR ORDER?
                            </h3>

                            <div className="w-full max-w-sm space-y-4">
                                <button
                                    onClick={onSelectDelivery}
                                    className="w-full py-4 px-6 border-2 border-kfc-black rounded-full text-sm font-bold uppercase tracking-widest text-kfc-black hover:bg-kfc-black hover:text-white transition-all active:scale-95"
                                >
                                    Delivery
                                </button>
                                {['Pick up', 'Dine In'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => onSelectStore(option)}
                                        className="w-full py-4 px-6 border-2 border-kfc-black rounded-full text-sm font-bold uppercase tracking-widest text-kfc-black hover:bg-kfc-black hover:text-white transition-all active:scale-95"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StartOrderModal;
