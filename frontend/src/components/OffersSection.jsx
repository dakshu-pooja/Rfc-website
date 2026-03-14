import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { offers, renderTicketContent } from '../data/offersData';

const OffersSection = ({ hideStripes = false }) => {
    const scrollRef = useRef(null);
    const [scrollState, setScrollState] = useState({ progress: 0, thumbWidth: 40 });

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = (scrollLeft / scrollWidth) * 100;
            const thumbWidth = (clientWidth / scrollWidth) * 100;
            setScrollState({ progress, thumbWidth });
        }
    };

    useEffect(() => {
        const scrollNode = scrollRef.current;
        if (scrollNode) {
            scrollNode.addEventListener('scroll', handleScroll);
            handleScroll();
            // Handle window resize as well
            window.addEventListener('resize', handleScroll);
        }
        return () => {
            if (scrollNode) {
                scrollNode.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            // Precise scroll by one card (300px card + 16px gap)
            const cardWidth = 316;
            const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleIndicatorClick = (e) => {
        if (scrollRef.current) {
            const track = e.currentTarget;
            const rect = track.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const percentage = clickPosition / rect.width;
            const { scrollWidth, clientWidth } = scrollRef.current;
            const scrollTo = percentage * (scrollWidth - clientWidth);
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="pt-4 pb-12 relative w-full overflow-hidden">
            <div className="flex items-end justify-between mb-8 pb-2 border-b-2 border-transparent">
                <div className="flex flex-col">
                    {!hideStripes && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="94" height="33" viewBox="0 0 80 42" fill="none" className="mb-3">
                            <rect width="16.4103" height="41.0256" fill="#E4002B" />
                            <rect x="32.8203" width="16.4103" height="41.0256" fill="#E4002B" />
                            <rect x="63.5898" width="16.4103" height="41.0256" fill="#E4002B" />
                        </svg>
                    )}
                    <h2 className="text-[28px] md:text-[32px] font-[900] text-[#202124] uppercase tracking-tighter font-condensed">
                        SAVE MORE AS YOU ORDER
                    </h2>
                </div>
                <div className="flex items-center gap-6 mb-1 pr-1">
                    <span className="text-[14px] font-bold text-[#202124] hidden lg:block opacity-80">For Members Only</span>
                    <Link to="/deals" className="text-[14px] font-[900] text-[#202124] hover:text-kfc-red transition-all flex items-center gap-2 group whitespace-nowrap border-b-2 border-transparent hover:border-kfc-red pb-0.5">
                        View Offers <span className="text-[18px] group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>

            <div className="relative group/nav">
                {/* Scroll Navigation Buttons - Always visible on desktop */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-[-22px] top-[45%] -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center z-30 hover:bg-gray-50 transition-all border border-gray-100 hidden md:flex"
                    aria-label="Scroll Left"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-[-22px] top-[45%] -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center z-30 hover:bg-gray-50 transition-all border border-gray-100 hidden md:flex"
                    aria-label="Scroll Right"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1 snap-x snap-mandatory overscroll-x-contain scroll-smooth"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {offers.map((offer) => {
                        // Render completely different layout for promoCTA
                        if (offer.type === 'promoCTA') {
                            return (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="min-w-[280px] md:min-w-[300px] h-[400px] bg-[#E4002B] rounded-[10px] overflow-hidden shadow-md flex flex-col cursor-pointer relative snap-start"
                                >
                                    <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center relative z-10">
                                        {/* Main content */}
                                        <h3 className="text-[30px] font-[900] text-white uppercase tracking-tight leading-[1] mb-1 z-10 font-black italic mt-4">
                                            SIGN IN TO SEE
                                            <br />
                                            EXCLUSIVE OFFERS
                                            <br />
                                            & DEALS
                                        </h3>

                                        <button className="mt-10 w-[85%] bg-transparent border-[1.5px] border-white text-white text-[15px] font-[800] tracking-wide py-[10px] rounded-full hover:bg-white hover:text-[#E4002B] transition-colors z-10">
                                            Sign In / Sign up
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        }

                        // Normal card layout
                        return (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="min-w-[280px] md:min-w-[300px] h-[400px] bg-[#f8f8f8] rounded-[6px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col cursor-pointer snap-start"
                            >
                                {/* Red Ticket Area */}
                                <div className="bg-[#E4002B] p-4 relative">
                                    {/* Scalloped edges effect - using pseudo elements or radial gradients */}
                                    <div className="absolute top-2 bottom-2 left-0 w-3 flex flex-col justify-between py-1 z-20">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="w-3 h-3 rounded-full bg-white -ml-1.5"></div>
                                        ))}
                                    </div>
                                    <div className="absolute top-2 bottom-2 right-0 w-3 flex flex-col justify-between py-1 z-20">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="w-3 h-3 rounded-full bg-white -mr-1.5"></div>
                                        ))}
                                    </div>

                                    {/* Inner Ticket Area with dashed border */}
                                    <div className="relative aspect-video rounded-[4px] border-[2px] border-dashed border-white/40 overflow-hidden flex items-center justify-center bg-black/5">
                                        {renderTicketContent(offer)}
                                    </div>
                                </div>

                                {/* White Info Area */}
                                <div className="p-5 flex flex-col items-center text-center flex-1 bg-white">
                                    <h3 className="text-[17px] font-black text-[#202124] uppercase tracking-tight leading-tight mb-2">
                                        {offer.title}
                                    </h3>
                                    <p className="text-[13px] font-medium text-gray-500 mb-6">
                                        {offer.desc}
                                    </p>

                                    <div className="mt-auto w-full flex flex-col gap-3">
                                        <button className="text-[12px] font-bold underline underline-offset-4 decoration-1 tracking-wide text-[#202124] hover:text-[#E4002B] transition-colors">
                                            View Details
                                        </button>
                                        <button className="w-full bg-[#202124] text-white text-[12px] font-black uppercase tracking-wider py-3 rounded-full hover:bg-black transition-all active:scale-95">
                                            Apply Offer
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Custom Scroll Indicator */}
                <div className="mt-8 flex justify-center w-full mb-4">
                    <div
                        onClick={handleIndicatorClick}
                        className="w-[480px] max-w-[90%] h-[3px] bg-gray-100 rounded-full overflow-hidden relative cursor-pointer group/indicator"
                    >
                        {/* Hover effect for track */}
                        <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover/indicator:opacity-100 transition-opacity" />
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-[#202124] rounded-full z-10"
                            style={{ width: `${scrollState.thumbWidth}%` }}
                            animate={{ x: `${(scrollState.progress / 100) * 480}px` }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default OffersSection;
