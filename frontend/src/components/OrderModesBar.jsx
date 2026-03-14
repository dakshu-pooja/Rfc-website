import React from 'react';

const OrderModesBar = ({ onStartOrder }) => {
    return (
        <div className="bg-[#202124] py-4 z-[50] border-b border-white/5">
            <div className="max-w-[1240px] mx-auto px-4 flex flex-row items-center justify-center gap-4 md:gap-8">
                <h2 className="text-white text-[13px] md:text-[16px] font-black uppercase tracking-tight">
                    LET'S ORDER FOR DELIVERY, PICK UP, OR DINE-IN
                </h2>
                <button
                    onClick={onStartOrder}
                    className="bg-[#E4002B] text-white text-[14px] font-bold px-8 py-2.5 rounded-full hover:bg-[#c30025] transition-all transform active:scale-95 whitespace-nowrap"
                >
                    Start Order
                </button>
            </div>
        </div>
    );
};

export default OrderModesBar;
