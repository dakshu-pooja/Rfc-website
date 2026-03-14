import React from 'react';
import MenuCategories from '../components/MenuCategories';
import OffersSection from '../components/OffersSection';

const Home = () => {
    return (
        <div className="max-w-[1240px] mx-auto px-4">
            <MenuCategories />
            <OffersSection />
        </div>
    );
};

export default Home;
