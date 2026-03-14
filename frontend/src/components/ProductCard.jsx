import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, description, image, isVeg }) => {
    const { addToCart, updateQuantity, cart } = useCart();
    const navigate = useNavigate();

    // Check if item is already in cart
    const cartItem = cart.find(item => item.id === id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddClick = (e) => {
        e.stopPropagation();
        const isFirstItem = cart.length === 0;
        addToCart({ id, name, price, image });
        if (isFirstItem) {
            navigate('/cart');
        }
    };

    const handleUpdateQuantity = (e, newQty) => {
        e.stopPropagation();
        updateQuantity(id, newQty);
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden flex flex-col h-[460px] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                    <h3 className="text-[15px] font-black text-[#202124] uppercase tracking-tight leading-tight mb-1 line-clamp-1 group-hover:text-kfc-red transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3.5 h-3.5 border ${isVeg ? 'border-green-600' : 'border-[#E4002B]'} p-[2px] flex items-center justify-center`}>
                            <div className={`w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-[#E4002B]'}`}></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isVeg ? 'Veg' : 'Non-Veg'}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[18px] font-black text-[#202124]">₹{price}</span>
                    </div>
                </div>

                <p className="text-[13px] text-gray-500 line-clamp-3 leading-relaxed mb-6 font-medium">
                    {description}
                </p>

                {/* Button Section */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                    {quantity > 0 ? (
                        <div className="flex items-center justify-between bg-white border-2 border-kfc-red rounded-full h-[44px] overflow-hidden">
                            <button
                                onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
                                className="w-12 h-full flex items-center justify-center hover:bg-kfc-red hover:text-white transition-colors text-kfc-red"
                            >
                                <Minus className="w-4 h-4" strokeWidth={3} />
                            </button>
                            <span className="text-[15px] font-black text-[#202124]">{quantity}</span>
                            <button
                                onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
                                className="w-12 h-full flex items-center justify-center hover:bg-kfc-red hover:text-white transition-colors text-kfc-red"
                            >
                                <Plus className="w-4 h-4" strokeWidth={3} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddClick}
                            className="w-full bg-white border-2 border-kfc-red text-kfc-red py-2.5 rounded-full text-[13px] font-black uppercase tracking-wider hover:bg-kfc-red hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95 shadow-sm"
                        >
                            Add to Cart
                            <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" strokeWidth={3} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
