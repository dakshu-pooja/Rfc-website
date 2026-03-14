import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import goldEditionImg from '../assets/KFC-Gold-Burger-White-Category-23MAY_4.webp';
import boxMealsImg from '../assets/BOX MEALS.webp';
import varietyBucketsImg from '../assets/Variety Bucket.webp';
import vegImg from '../assets/Veg.webp';
import chickenBucketsImg from '../assets/KFC-White-Chicken-Bucket.webp';
import burgersImg from '../assets/KFC-Burger.webp';
import snacksImg from '../assets/snacks.webp';
import riceBowlzImg from '../assets/rice-bowlz.webp';
import beveragesImg from '../assets/Beverages&desserts.webp';
import epicBucketImg from '../assets/EPIC.webp';

const categories = [
    {
        id: 'gold-edition',
        name: 'GOLD EDITION',
        image: goldEditionImg,
    },
    {
        id: 'box-meals',
        name: 'BOX MEALS',
        image: boxMealsImg,
    },
    {
        id: 'variety-buckets',
        name: 'VARIETY BUCKETS',
        image: varietyBucketsImg,
    },
    {
        id: 'veg',
        name: 'VEG',
        image: vegImg,
    },
    {
        id: 'chicken-buckets',
        name: 'CHICKEN BUCKETS',
        image: chickenBucketsImg,
    },
    {
        id: 'burgers',
        name: 'BURGERS',
        image: burgersImg,
    },
    {
        id: 'snacks',
        name: 'SNACKS',
        image: snacksImg,
    },
    {
        id: 'rice-bowls',
        name: 'RICE BOWLZ',
        image: riceBowlzImg,
    },
    {
        id: 'beverages-desserts',
        name: 'BEVERAGE & DESSERTS',
        image: beveragesImg,
    }
];

const MenuCategories = () => {
    return (
        <section className="py-16">
            <div className="flex items-center gap-6 mb-12">
                <h2 className="text-3xl font-[900] text-kfc-black uppercase tracking-tighter italic">
                    BROWSE MENU CATEGORIES
                </h2>
                <div className="flex-1 h-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Large Feature Card: Epic Bucket */}
                <Link to="/menu" className="md:col-span-2 md:row-span-2">
                    <motion.div
                        className="relative group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 h-full"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="aspect-[4/3] md:aspect-auto h-full relative">
                            <img
                                src={epicBucketImg}
                                alt="Epic Bucket of the Day"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-white/95 backdrop-blur-sm border-t border-gray-100">
                            <h3 className="text-xl font-black uppercase tracking-widest text-kfc-black">
                                EPIC BUCKET OF THE DAY
                            </h3>
                        </div>
                    </motion.div>
                </Link>

                {/* Category Grid Items */}
                {categories.map((cat) => (
                    <Link to="/menu" key={cat.id}>
                        <motion.div
                            className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 h-full"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="aspect-[5/4] relative">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 text-center bg-white border-t border-gray-100">
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-kfc-black">
                                    {cat.name}
                                </h3>
                            </div>
                        </motion.div>
                    </Link>
                ))}

                {/* View All Menu Placeholder - Spanning 3 columns as per screenshot */}
                <Link to="/menu" className="md:col-span-3">
                    <div className="flex flex-col items-center justify-center p-8 bg-[#F8F7F5] rounded-xl border-2 border-dashed border-gray-200 h-full group min-h-[160px]">
                        <div className="text-[42px] md:text-[52px] font-black text-kfc-red mb-4 italic leading-tight text-center" style={{ fontFamily: "'Georgia', serif" }}>
                            "it's finger lickin' good"
                        </div>
                        <button className="flex items-center gap-2 text-sm font-bold text-[#202124] hover:text-kfc-red transition-colors">
                            View All Menu
                            <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default MenuCategories;
