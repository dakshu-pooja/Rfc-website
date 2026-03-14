import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeModal = ({ isOpen, onClose }) => {
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
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-[600px] rounded-[10px] shadow-2xl overflow-hidden p-12 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-[900] text-kfc-black uppercase tracking-tight mb-12 leading-tight">
                            INVALID QR CODE, WOULD YOU LIKE TO EXPLORE NEARBY KFC STORE
                        </h2>

                        <button
                            onClick={onClose}
                            className="bg-kfc-black text-white text-sm font-black uppercase tracking-widest px-10 py-5 rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-xl"
                        >
                            Find Open KFC
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
