import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import kfcBucketProper from '../assets/kfc-bucket-proper.png';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { openOrderModal } = useLocation();
    const { cart } = useCart();

    return (
        <div className="max-w-[1240px] mx-auto px-4 py-12">
            {/* Page Title */}
            <div className="mb-8">
                <div className="flex gap-[2px] mb-4">
                    <div className="w-1.5 h-6 bg-kfc-red"></div>
                    <div className="w-1.5 h-6 bg-kfc-red"></div>
                    <div className="w-1.5 h-6 bg-kfc-red"></div>
                </div>
                <h1 className="text-4xl font-[900] text-kfc-black uppercase tracking-tighter italic">
                    MY CART
                </h1>
            </div>

            {cart.length === 0 ? (
                /* Empty Cart Banner - Box Layout */
                <div className="relative bg-[#F8F7F5] rounded-[32px] min-h-[520px] flex items-center mb-16 overflow-hidden px-8 md:px-16">
                    <div className="relative z-10 py-12">
                        <h2 className="text-[32px] md:text-[48px] font-[900] text-[#202124] uppercase leading-[1] tracking-[-0.04em] mb-10 font-condensed">
                            YOUR CART IS <br />
                            EMPTY. LET'S <br />
                            START AN <br />
                            ORDER!
                        </h2>
                        <button
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => openOrderModal(), 100);
                            }}
                            className="inline-block bg-[#E4002B] text-white text-[15px] font-black px-16 py-4 rounded-full hover:bg-[#c40025] transition-all transform active:scale-95 shadow-xl shadow-red-900/20 text-center"
                        >
                            Start Order
                        </button>
                    </div>

                    {/* High Fidelity "Proper" Bucket Image */}
                    <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[60%] h-full hidden md:flex justify-end items-center pointer-events-none">
                        <div className="relative w-[520px] h-[520px] flex items-center justify-center">
                            <img
                                src={kfcBucketProper}
                                alt="KFC Bucket"
                                className="w-full h-auto object-contain drop-shadow-[30px_40px_40px_rgba(0,0,0,0.1)]"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-16">
                    {/* Cart Items List could go here if implemented, but keeping it simple as per original request to fix visibility first */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <p className="text-gray-500 font-bold uppercase tracking-tight">Items in your cart:</p>
                        <div className="mt-4 space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-black uppercase text-[#202124]">{item.name}</h3>
                                            <p className="text-sm text-gray-500 font-bold">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-black text-kfc-red">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between items-center bg-[#F8F7F5] p-6 rounded-xl">
                            <span className="text-xl font-black uppercase italic">Total:</span>
                            <span className="text-2xl font-black text-kfc-red">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Still Have A Question */}
            <div className="mb-16 mt-12 max-w-[600px] mx-auto text-center">
                <h2 className="text-[24px] md:text-[28px] font-[900] text-[#202124] uppercase tracking-tight mb-4 font-condensed text-left">
                    STILL HAVE A QUESTION?
                </h2>
                <div className="h-[1.5px] bg-gradient-to-r from-gray-300 to-transparent mb-8"></div>
                <div className="flex flex-wrap gap-5 justify-start">
                    <a
                        href="tel:+911800123456"
                        className="flex items-center gap-2.5 px-7 py-3 rounded-full border-[1.5px] border-[#202124] hover:bg-[#202124] hover:text-white transition-all text-[#202124]"
                    >
                        <Phone className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-[13px] font-bold">Call Us</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-2.5 px-7 py-3 rounded-full border-[1.5px] border-[#202124] hover:bg-[#202124] hover:text-white transition-all text-[#202124]"
                    >
                        <Mail className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-[13px] font-bold">Contact Us</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Cart;
