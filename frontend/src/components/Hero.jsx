import React from 'react';

const Hero = () => {
    return (
        <section className="relative w-full h-[600px] bg-kfc-black flex items-center justify-center overflow-hidden">
            {/* Background patterns or accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-kfc-red skew-x-[-15deg] translate-x-1/4 opacity-90"></div>

            <div className="max-w-7xl mx-auto px-4 w-full relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="text-white text-center md:text-left md:w-1/2">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-2 text-red-500">Deliciously Fresh</h2>
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter mb-6">
                        KFC <br /> FAVORITES
                    </h1>
                    <p className="text-lg md:text-xl font-medium mb-8 max-w-md opacity-90">
                        Hand-breaded, freshly prepared, and finger lickin' good. Order your bucket today!
                    </p>
                    <button className="bg-kfc-red hover:bg-red-700 text-white text-lg font-black italic uppercase tracking-widest px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-2xl">
                        Order Now
                    </button>
                </div>

                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                    <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
                        <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
                        <img
                            src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800"
                            alt="KFC Bucket"
                            className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-12"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
