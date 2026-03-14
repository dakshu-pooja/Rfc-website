import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessToast = ({ message, isVisible, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 100, x: '-50%' }}
                    className="fixed bottom-10 left-1/2 z-[1000] w-full max-w-[900px] px-6"
                >
                    <div className="bg-[#202124] text-white px-8 py-5 rounded-[4px] shadow-2xl flex items-center justify-center text-center">
                        <p className="text-[17px] font-bold tracking-tight leading-snug">
                            {message}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessToast;
