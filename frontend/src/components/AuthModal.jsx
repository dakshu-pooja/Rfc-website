import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [phone, setPhone] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        if (phone.length >= 10) {
            login(phone);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] bg-white overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-full w-full flex flex-col items-center px-10 pt-6 pb-6 relative"
                    >
                        {/* Close button - Top Right */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-6 p-2 hover:bg-gray-50 rounded-full transition-colors z-[160]"
                        >
                            <X className="w-7 h-7 text-kfc-black" />
                        </button>

                        {/* Top Label */}
                        <p className="text-[13px] font-medium text-[#212529] mb-4 tracking-tight">Sign In / Sign up</p>

                        {/* Logo */}
                        <div className="mb-6 flex flex-col items-center">
                            <h1 className="text-[48px] font-[1000] text-kfc-red italic uppercase leading-none tracking-tighter">KFC</h1>
                        </div>

                        {/* Title - Bold & Impactful */}
                        <h2 className="text-[24px] font-[900] text-[#212529] uppercase tracking-tighter text-center mb-6 leading-[1.1] max-w-[480px] font-bold">
                            LET’S SIGN IN OR CREATE ACCOUNT WITH YOUR PHONE NUMBER!
                        </h2>

                        {/* Form Container */}
                        <div className="w-full max-w-[400px] flex flex-col items-center">
                            {/* Phone Input */}
                            <div className="w-full mb-6 text-left">
                                <label className="text-[14px] font-medium text-[#212529] mb-0.5 block">Phone Number*</label>
                                <div className="border-b border-gray-300 focus-within:border-black transition-all py-1">
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full text-[16px] font-medium bg-transparent outline-none text-[#212529]"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Privacy Policy */}
                            <div className="w-full text-left mb-8">
                                <p className="text-[12px] font-medium text-[#212529] leading-5">
                                    By “logging in to KFC”, you agree to our <span className="underline font-bold cursor-pointer hover:text-kfc-red transition-colors">Privacy Policy</span> and <span className="underline font-bold cursor-pointer hover:text-kfc-red transition-colors">Terms & Conditions.</span>
                                </p>
                            </div>

                            {/* Buttons Container */}
                            <div className="w-full flex flex-col items-center">
                                <button
                                    onClick={handleLogin}
                                    className={`w-[260px] py-3 rounded-full text-[14px] font-[900] transition-all mb-4 shadow-sm ${phone.length >= 10
                                        ? 'bg-kfc-black text-white hover:bg-black active:scale-[0.98]'
                                        : 'bg-[#EAECEE] text-[#9BA4AD] cursor-not-allowed'
                                        }`}
                                >
                                    Send Me a Code
                                </button>

                                <div className="relative w-full text-center flex items-center justify-center gap-6 mb-4">
                                    <div className="flex-grow border-t border-gray-100"></div>
                                    <span className="text-[13px] font-medium text-[#212529]/60 lowercase bg-white px-2">or</span>
                                    <div className="flex-grow border-t border-gray-100"></div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full py-3 border-[1.5px] border-[#212529] rounded-full text-[14px] font-bold text-[#212529] hover:bg-gray-50 transition-all active:scale-[0.98]"
                                >
                                    Skip, Continue As Guest
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
