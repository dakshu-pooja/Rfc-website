import React from 'react';
import { offers, renderTicketContent } from '../data/offersData';
import { motion } from 'framer-motion';

const Deals = () => {
    const [scrollState, setScrollState] = React.useState({ progress: 0, thumbWidth: 40 });
    const scrollRef = React.useRef(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = (scrollLeft / scrollWidth) * 100;
            const thumbWidth = (clientWidth / scrollWidth) * 100;
            setScrollState({ progress, thumbWidth });
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

    React.useEffect(() => {
        const scrollNode = scrollRef.current;
        if (scrollNode) {
            scrollNode.addEventListener('scroll', handleScroll);
            handleScroll();
            window.addEventListener('resize', handleScroll);
        }
        return () => {
            scrollNode?.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Hero Banner Section */}
            <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                        backgroundImage: `url('/assets/Variety Bucket.webp')`,
                        filter: 'brightness(0.5)'
                    }}
                ></div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-white text-[40px] md:text-[64px] font-[900] uppercase tracking-tighter leading-none font-condensed mb-2">
                        SAVE MORE AS YOU ORDER
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1240px] mx-auto px-4 py-12">
                {/* Stripes Branding */}
                <div className="mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="94" height="33" viewBox="0 0 80 42" fill="none" className="mb-3">
                        <rect width="16.4103" height="41.0256" fill="#E4002B" />
                        <rect x="32.8203" width="16.4103" height="41.0256" fill="#E4002B" />
                        <rect x="63.5898" width="16.4103" height="41.0256" fill="#E4002B" />
                    </svg>
                    <h2 className="text-[28px] md:text-[32px] font-[900] text-[#202124] uppercase tracking-tighter font-condensed">
                        OFFERS FOR YOU
                    </h2>
                    <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        For Members Only
                    </div>
                    <div className="text-[11px] font-medium text-gray-500 mt-1">
                        Sign in to see exclusive offers & deals
                    </div>
                </div>

                {/* Offers Scroll Container */}
                <div className="relative group/nav">
                    {/* Scroll Navigation Buttons - Always visible on desktop */}
                    <button
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollBy({ left: -364, behavior: 'smooth' });
                            }
                        }}
                        className="absolute left-[-22px] top-[45%] -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center z-30 hover:bg-gray-50 transition-all border border-gray-100 hidden md:flex"
                        aria-label="Scroll Left"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollBy({ left: 364, behavior: 'smooth' });
                            }
                        }}
                        className="absolute right-[-22px] top-[45%] -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center z-30 hover:bg-gray-50 transition-all border border-gray-100 hidden md:flex"
                        aria-label="Scroll Right"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    <div
                        ref={scrollRef}
                        id="deals-scroll-container"
                        className="flex gap-6 overflow-x-auto no-scrollbar pb-6 px-1 snap-x snap-mandatory overscroll-x-contain scroll-smooth"
                    >
                        {offers.map((offer) => {
                            if (offer.type === 'promoCTA') {
                                return (
                                    <motion.div
                                        key="special-promo"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="min-w-[280px] md:min-w-[340px] h-[400px] bg-[#E4002B] rounded-[10px] overflow-hidden shadow-lg flex flex-col cursor-pointer relative snap-start"
                                    >
                                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center relative z-10">
                                            <h3 className="text-[30px] font-black text-white uppercase tracking-tight leading-[1] mb-2 italic">
                                                SIGN IN TO SEE
                                                <br />
                                                EXCLUSIVE OFFERS
                                                <br />
                                                & DEALS
                                            </h3>
                                            <button className="mt-10 w-[85%] bg-transparent border-[1.5px] border-white text-white text-[15px] font-[800] tracking-wide py-3 rounded-full hover:bg-white hover:text-[#E4002B] transition-colors">
                                                Sign In / Sign up
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="min-w-[280px] md:min-w-[340px] h-[400px] bg-[#f8f8f8] rounded-[6px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col cursor-pointer hover:shadow-xl transition-shadow snap-start"
                                >
                                    {/* Red Ticket Area */}
                                    <div className="bg-[#E4002B] p-4 relative">
                                        <div className="absolute top-2 bottom-2 left-0 w-3 flex flex-col justify-between py-1 z-20">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full bg-white -ml-1.5 "></div>
                                            ))}
                                        </div>
                                        <div className="absolute top-2 bottom-2 right-0 w-3 flex flex-col justify-between py-1 z-20">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full bg-white -mr-1.5"></div>
                                            ))}
                                        </div>

                                        <div className="relative aspect-video rounded-[4px] border-[2px] border-dashed border-white/40 overflow-hidden flex items-center justify-center bg-black/5">
                                            {renderTicketContent(offer)}
                                        </div>
                                    </div>

                                    {/* White Info Area */}
                                    <div className="p-6 flex flex-col items-center text-center flex-1 bg-white">
                                        <h3 className="text-[18px] font-black text-[#202124] uppercase tracking-tight leading-tight mb-2">
                                            {offer.title}
                                        </h3>
                                        <p className="text-[14px] font-medium text-gray-500 mb-8">
                                            {offer.desc}
                                        </p>

                                        <div className="mt-auto w-full flex flex-col gap-3">
                                            <button className="text-[12px] font-bold underline underline-offset-4 decoration-1 tracking-wide text-[#202124] hover:text-[#E4002B] transition-colors">
                                                View Details
                                            </button>
                                            <button className="w-full bg-[#202124] text-white text-[13px] font-black uppercase tracking-wider py-3.5 rounded-full hover:bg-black transition-all active:scale-95">
                                                Apply Offer
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Custom Scroll Indicator */}
                    <div className="mt-10 flex justify-center w-full mb-6">
                        <div
                            onClick={handleIndicatorClick}
                            className="w-[480px] max-w-[90%] h-[3px] bg-gray-100 rounded-full overflow-hidden relative cursor-pointer group/indicator"
                        >
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
            </div>
        </div>
    );
};

export default Deals;
