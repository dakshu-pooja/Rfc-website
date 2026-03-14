import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        image: "/assets/D-PR00002957.jpg",
        title: "GOLD EDITION RANGE",
        subtitle: "Experience the premium taste"
    },
    {
        image: "https://orderserv-kfc-assets.yum.com/15895bb59f7b491a/images/offers/lg/CHKZINGER.jpg",
        title: "FREE CLASSIC ZINGER",
        subtitle: "On your first order"
    },
    {
        image: "https://orderserv-kfc-assets.yum.com/15895bb59f7b491a/images/offers/lg/YAYPOP.jpg",
        title: "FREE POPCORN",
        subtitle: "On orders above ₹499"
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-3xl mb-12 group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-12 text-white">
                        <motion.h2
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl font-black uppercase tracking-tighter italic mb-2"
                        >
                            {slides[currentSlide].title}
                        </motion.h2>
                        <motion.p
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl font-bold uppercase tracking-widest text-red-400"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-white/40'
                            }`}
                    />
                ))}
            </div>

        </div>
    );
};

export default HeroSlider;
