import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, MapPin, Navigation, Map as MapIcon } from 'lucide-react';

const StoreSelectionModal = ({ isOpen, onClose, onBack, onSignIn, onUseLocation, onSelectStore }) => {
    const [query, setQuery] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const [isDeliveryUnavailable, setIsDeliveryUnavailable] = React.useState(false);

    const detailedLocations = [
        'Tamil Nadu, India', 'Tamia, Madhya Pradesh, India', 'Tamilnadu, Tamil Nadu',
        'Tamiya, Madhya Pradesh, India', 'Tamilaga Vettri Kazhagam Party Headquarters, Panaiyur, Chennai, 8th Avenue, Panaiyur, Chennai, Tamil Nadu, India',
        'Chennai, Tamil Nadu, India', 'Mumbai, Maharashtra, India', 'Delhi, India',
        'Bangalore, Karnataka, India', 'Hyderabad, Telangana, India', 'Indiranagar, Bangalore, Karnataka',
        'Koramangala, Bangalore, Karnataka', 'Andheri East, Mumbai, Maharashtra', 'CP, New Delhi, Delhi',
        'T. Nagar, Chennai, Tamil Nadu', 'Pune, Maharashtra, India', 'Kolkata, West Bengal, India'
    ];

    const handleConfirm = (directValue = null) => {
        const val = typeof directValue === 'string' ? directValue : query;
        if (!val || !val.trim()) return;

        const cleanVal = val.trim();
        // Validation logic: Only Chennai or Current Location is accepted
        if (cleanVal.toLowerCase().includes('chennai') || cleanVal === 'Current Location') {
            onSelectStore?.(cleanVal);
            onClose();
        } else {
            setIsDeliveryUnavailable(true);
        }
    };

    const suggestions = detailedLocations.filter(s => s.toLowerCase().includes(query.toLowerCase()));
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-[1000px] rounded-[10px] shadow-2xl overflow-hidden min-h-[500px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                            <button
                                onClick={onBack}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ChevronLeft className="w-8 h-8 text-kfc-black" />
                            </button>

                            <h2 className="text-3xl font-[900] text-kfc-black uppercase tracking-tight">
                                SELECT A KFC
                            </h2>

                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-8 h-8 text-kfc-black" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-16 flex flex-col items-center">
                            <div className="w-full max-w-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <p className="text-sm font-bold text-gray-700">
                                        Already a member? <span className="underline cursor-pointer" onClick={onSignIn}>Sign in / Sign up</span>
                                    </p>
                                    <button
                                        onClick={() => {
                                            setQuery('Current Location');
                                            onUseLocation?.();
                                            handleConfirm('Current Location');
                                        }}
                                        className="flex items-center gap-2 text-sm font-bold text-kfc-black hover:text-kfc-red transition-colors underline"
                                    >
                                        <Navigation className="w-4 h-4 fill-current" />
                                        Use My Location
                                    </button>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleConfirm();
                                    }}
                                    className="flex gap-4 items-center relative mb-12"
                                >
                                    <div className={`relative flex-grow flex items-center border-[1.5px] rounded-full transition-all px-6 py-4 ${isFocused || query ? 'border-kfc-red shadow-sm' : 'border-gray-200'
                                        }`}>
                                        <MapPin className={`w-6 h-6 mr-4 transition-colors ${isFocused || query ? 'text-kfc-red' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type="text"
                                            value={query}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                            onChange={(e) => {
                                                setQuery(e.target.value);
                                                setIsDeliveryUnavailable(false);
                                            }}
                                            placeholder="Search by State, City or Zip"
                                            className="w-full text-[16px] font-bold text-kfc-black bg-transparent outline-none placeholder:text-gray-400"
                                        />

                                        {/* Suggestions Dropdown */}
                                        {query && suggestions.length > 0 && isFocused && (
                                            <div className="absolute top-full mt-3 left-0 right-0 bg-[#202124] rounded-[10px] shadow-[0_15px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden py-4 border border-gray-800">
                                                <div className="px-8 pb-3 text-[14px] font-bold text-gray-400 uppercase tracking-tight">
                                                    Suggested Search Terms
                                                </div>
                                                {suggestions.map((s, i) => (
                                                    <div
                                                        key={i}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault(); // Prevent input onBlur from firing before this
                                                            setQuery(s);
                                                            setIsFocused(false);
                                                            setIsDeliveryUnavailable(false);
                                                        }}
                                                        className="px-8 py-4 hover:bg-[#2F3033] cursor-pointer group flex items-start gap-4 transition-colors"
                                                    >
                                                        <MapPin className="w-5 h-5 mt-1 text-gray-500 group-hover:text-kfc-red transition-colors shrink-0" />
                                                        <span className="text-[17px] font-bold text-white tracking-tight leading-tight">{s}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className={`text-[14px] font-[900] uppercase px-12 py-[18px] rounded-full transition-all shadow-sm shrink-0 ${query ? 'bg-[#202124] text-white hover:bg-black' : 'bg-[#EAECEE] text-[#9BA4AD] cursor-not-allowed'}`}
                                    >
                                        CONFIRM
                                    </button>
                                </form>

                                {/* Error UI Section */}
                                <div className="min-h-[220px] flex items-center justify-center">
                                    {isDeliveryUnavailable ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full border border-gray-100 rounded-[10px] p-10 flex flex-col items-center justify-center text-center bg-white shadow-[0_2px_15px_rgba(0,0,0,0.05)]"
                                        >
                                            <div className="text-[#E4002B] mb-3">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M12 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <p className="text-[#E4002B] text-[16px] font-[900] leading-tight mb-8">
                                                Delivery is currently unavailable for your location. Would you like to order pick up instead?
                                            </p>
                                            <div className="flex gap-4 w-full justify-center">
                                                <button
                                                    onClick={() => {
                                                        setIsDeliveryUnavailable(false);
                                                        setQuery('');
                                                    }}
                                                    className="px-10 py-3.5 rounded-full border-[1.5px] border-kfc-black text-[14px] font-black text-kfc-black hover:bg-gray-50 transition-all uppercase tracking-tight"
                                                >
                                                    Search for a different address
                                                </button>
                                                <button
                                                    className="px-12 py-3.5 rounded-full border-[1.5px] border-kfc-black text-[14px] font-black text-kfc-black hover:bg-gray-50 transition-all uppercase tracking-tight"
                                                >
                                                    Order Take Away
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="w-full border-t border-gray-100 pt-8 flex items-center justify-between">
                                            <p className="text-sm italic font-bold text-gray-500">
                                                Please enter your location
                                            </p>
                                            <button className="flex items-center gap-2 text-sm font-bold text-kfc-black hover:text-kfc-red transition-colors underline">
                                                <MapIcon className="w-4 h-4" />
                                                Map
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StoreSelectionModal;
