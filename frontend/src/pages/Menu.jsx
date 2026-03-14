import React, { useState, useEffect, useRef } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import OffersSection from '../components/OffersSection';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const sectionRefs = useRef({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${apiUrl}/api/products`);
                const data = await response.json();
                setProducts(data);
                if (data.length > 0) setActiveCategory(data[0].category);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.getAttribute('data-category'));
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-240px 0px -50% 0px'
        });

        const sections = Object.values(sectionRefs.current);
        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => sections.forEach(section => {
            if (section) observer.unobserve(section);
        });
    }, [products]);

    const orderedCategories = [
        "DUNKED RANGE",
        "EPIC SAVERS",
        "FEASTIVAL MEALS",
        "GOLD EDITION",
        "BOX MEALS",
        "VARIETY BUCKETS",
        "CHICKEN BUCKETS",
        "BURGERS",
        "VEG",
        "SNACKS",
        "RICE BOWLZ",
        "DESSERTS & BEVERAGES"
    ];

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const availableCategories = [...new Set(filteredProducts.map(p => p.category?.trim().toUpperCase()))];
    const finalCategories = orderedCategories.filter(cat =>
        availableCategories.includes(cat.trim().toUpperCase())
    );

    const scrollToCategory = (category) => {
        setActiveCategory(category);
        sectionRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-kfc-cream flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-kfc-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Menu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1240px] mx-auto px-4">
            <div className="pb-20">
                <div className="flex gap-12">
                    <CategorySidebar
                        categories={orderedCategories}
                        activeCategory={activeCategory}
                        onCategoryClick={scrollToCategory}
                    />
                    <div className="flex-1 min-w-0">
                        {/* Offers and Search Section - Aligned with product column */}
                        <div className="mb-12">
                            <OffersSection hideStripes={true} />

                            {/* Search Bar Container */}
                            <div className="mt-4">
                                <div className="max-w-[400px] mb-8">
                                    <div className="relative flex items-center group">
                                        <div className="absolute left-3 z-10 transition-colors group-focus-within:text-kfc-red">
                                            <Search className="w-4 h-4 text-gray-400 font-bold" />
                                        </div>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search our menu"
                                            className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-6 text-[13px] font-bold text-[#202124] shadow-sm hover:border-gray-300 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {finalCategories.length > 0 ? (
                            finalCategories.map((category) => (
                                <section
                                    key={category}
                                    ref={el => sectionRefs.current[category] = el}
                                    className="mb-16 scroll-mt-[260px]"
                                    data-category={category}
                                >
                                    <div className="mb-8">
                                        <h2 className="text-[32px] font-[900] text-[#202124] uppercase tracking-tighter font-condensed">
                                            {category}
                                        </h2>
                                        <div className="w-16 h-1.5 bg-kfc-red mt-2 skew-x-[-15deg]"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredProducts
                                            .filter(p => p.category?.trim().toUpperCase() === category?.trim().toUpperCase())
                                            .map((product) => (
                                                <motion.div
                                                    key={product.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <ProductCard {...product} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </section>
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <div className="text-6xl mb-4">🍗</div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-gray-400">No matching items found</h3>
                                <p className="text-gray-400 mt-2">Try searching for something else!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
