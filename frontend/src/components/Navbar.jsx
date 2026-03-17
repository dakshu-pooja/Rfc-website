import React, { useState } from 'react';
import { ShoppingCart, User, Menu, MapPin, LogOut, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { motion } from 'framer-motion';
import KfcLogo from './KfcLogo';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, isAuthenticated, logout, openAuthModal } = useAuth();
    const { address } = useLocation();
    const [activeToggle, setActiveToggle] = useState('delivery');

    return (
        <header className="bg-white z-[60]">
            <nav className="max-w-[1240px] mx-auto px-4 h-[80px] flex items-center justify-between">
                {/* Left Section: Logo & Links */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex-shrink-0">
                        <KfcLogo />
                    </Link>

                    <div className="hidden lg:flex items-center gap-10">
                        <Link to="/menu" className="text-[16px] font-bold text-kfc-black hover:text-kfc-red transition-colors">Menu</Link>
                        <Link to="/deals" className="text-[16px] font-bold text-kfc-black hover:text-kfc-red transition-colors">Deals</Link>
                    </div>
                </div>

                {/* Right Section: Account & Cart */}
                <div className="flex items-center gap-8">
                    <div
                        onClick={() => !isAuthenticated && openAuthModal()}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <svg className="w-6 h-6 group-hover:text-kfc-red transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5a8.5 8.5 0 110 17 8.5 8.5 0 010-17zm0 3a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 6.5c-2.7 0-5.8 1.35-6 2.5-.05.3.1.55.4.6.05 0 .1.01.15.01h10.9c.3 0 .55-.2.6-.5.2-1.15-3.3-2.61-6.05-2.61z" />
                        </svg>
                        <span className="text-[14px] font-bold text-[#202124] group-hover:text-kfc-red transition-colors">
                            {isAuthenticated ? 'Account' : 'Sign In'}
                        </span>
                        {isAuthenticated && (
                            <button onClick={(e) => { e.stopPropagation(); logout(); }} title="Sign Out">
                                <LogOut className="w-4 h-4 text-gray-400 hover:text-kfc-red transition-colors ml-2" />
                            </button>
                        )}
                    </div>

                    <div className="h-10 w-[1px] bg-gray-200"></div>

                    <Link to="/cart" className="relative cursor-pointer group flex items-center">
                        <div className="relative flex items-center justify-center pt-2">
                            {/* Detailed Bucket Icon - High Fidelity */}
                            <svg width="45" height="45" viewBox="0 0 40 40">
                                {/* Base Shadow */}
                                <ellipse cx="20" cy="37" rx="12" ry="2" fill="black" opacity="0.08" />

                                {/* Chicken Drumstick */}
                                <g transform="translate(16, 2) rotate(-20)">
                                    <circle cx="3" cy="4" r="2.5" fill="white" stroke="#202124" strokeWidth="2" />
                                    <circle cx="7" cy="4" r="2.5" fill="white" stroke="#202124" strokeWidth="2" />
                                    <rect x="3" y="4" width="6" height="10" fill="white" stroke="#202124" strokeWidth="2" />
                                    <path d="M2 12 C2 8 10 8 10 12 L10 18 L2 18 Z" fill="#202124" stroke="#202124" strokeWidth="1" />
                                </g>

                                {/* Bucket Body */}
                                <path d="M8 14 L32 14 L29 35 L11 35 Z" fill="white" stroke="#202124" strokeWidth="2.5" />

                                {/* Red Branding Stripes */}
                                <path d="M8 14 L13 14 L13 35 L11 35 L8 14 Z" fill="#E4002B" />
                                <path d="M27 14 L32 14 L29 35 L27 35 L27 14 Z" fill="#E4002B" />

                                {/* Bucket Rim */}
                                <path d="M8 14 L32 14" stroke="#202124" strokeWidth="2.5" strokeLinecap="round" />

                                {/* Cart Count */}
                                <text x="20" y="28" textAnchor="middle" className="font-black text-[14px]" fill="#202124">
                                    {cartCount || 0}
                                </text>
                            </svg>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
