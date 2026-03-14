import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your KFC AI assistant. How can I help you today?" }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMessage = { role: 'user', text: inputText };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Simulate AI response
        setTimeout(() => {
            const botMessage = {
                role: 'bot',
                text: getBotResponse(inputText)
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const getBotResponse = (text) => {
        const input = text.toLowerCase();
        if (input.includes('menu') || input.includes('eat')) return "Check out our signature Zinger Burger or classic Chicken Bucket! Should I suggest a combo?";
        if (input.includes('order')) return "I can help with that. What would you like to add to your bucket?";
        if (input.includes('offer') || input.includes('promo')) return "We have a 20% discount on all buckets today! Use code 'KFCAI20'.";
        return "That sounds delicious! Is there anything specific from our menu you're looking for?";
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-kfc-red p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider leading-tight">Colonel AI</h3>
                                    <p className="text-[10px] opacity-80 uppercase font-medium">Always Fresh</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-red-700/50 p-1 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-kfc-cream/50">
                            {messages.map((ms, i) => (
                                <div key={i} className={`flex ${ms.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium shadow-sm ${ms.role === 'user'
                                            ? 'bg-kfc-red text-white rounded-tr-none'
                                            : 'bg-white text-kfc-black rounded-tl-none border border-gray-100'
                                        }`}>
                                        {ms.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-grow bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-kfc-red/20 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-kfc-red text-white p-2 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-kfc-red text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all active:scale-95 group relative"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-kfc-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                        Chat with Colonel
                    </span>
                )}
            </button>
        </div>
    );
};

export default AIChatbot;
