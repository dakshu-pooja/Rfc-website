import KfcLogo from './KfcLogo';

const CategorySidebar = ({ categories, activeCategory, onCategoryClick }) => {
    return (
        <aside className="hidden md:block self-start sticky top-[240px] w-56 flex-shrink-0 pr-4 max-h-[calc(100vh-260px)] overflow-y-auto no-scrollbar">
            <div className="flex flex-col items-start px-2">
                {/* Official KFC Logo */}
                <div className="mb-8 pl-4">
                    <KfcLogo className="scale-75 origin-left" />
                </div>

                <div className="mb-10 pl-4">
                    <h2 className="text-[32px] font-[900] text-[#202124] uppercase leading-none tracking-tight font-condensed italic">
                        KFC MENU
                    </h2>
                </div>

                <nav className="flex flex-col w-full gap-5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryClick(cat)}
                            className={`relative text-left text-[14px] font-[800] uppercase tracking-wide transition-all pl-4 outline-none ${activeCategory === cat
                                ? 'text-[#202124]'
                                : 'text-gray-400 hover:text-[#202124]'
                                } group`}
                        >
                            {activeCategory === cat && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#E4002B] skew-x-[-15deg]"></div>
                            )}
                            {cat}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default CategorySidebar;
