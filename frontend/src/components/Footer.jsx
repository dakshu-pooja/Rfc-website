import React from 'react';
import kfcLogoIcon from '../assets/KFC _ Order KFC Chicken Online and Find Restaurants_files/kfcLogo.492728c6.svg';
import googlePlayBadge from '../assets/KFC _ Order KFC Chicken Online and Find Restaurants_files/google_play.svg';
import appStoreBadge from '../assets/KFC _ Order KFC Chicken Online and Find Restaurants_files/apple.svg';

const Footer = () => {
    return (
        <footer className="bg-[#202124] text-white pt-16 pb-12 font-condensed">
            <div className="max-w-[1140px] mx-auto px-4 md:px-0">
                {/* Main Content Grid */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-8 mb-20 lg:ml-8 lg:mr-8 xl:ml-0 xl:mr-0">

                    {/* Logo */}
                    <div className="flex-shrink-0 mr-8 mt-2">
                        <img
                            src={kfcLogoIcon}
                            alt="KFC Logo"
                            className="w-[105px]"
                        />
                    </div>

                    {/* Columns 1-4 Container */}
                    <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-2">

                        {/* Legal */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-[13px] font-[900] tracking-wide text-white">Legal</h4>
                            <ul className="flex flex-col space-y-3">
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Terms and<br />Conditions</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Privacy Center</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Disclaimer</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Caution Notice</a></li>
                            </ul>
                        </div>

                        {/* KFC India */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-[13px] font-[900] tracking-wide text-white">KFC India</h4>
                            <ul className="flex flex-col space-y-3">
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">About KFC</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">KFC Care</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Careers</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Our Golden Past</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Responsible<br />Disclosure</a></li>
                            </ul>
                        </div>

                        {/* KFC Food */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-[13px] font-[900] tracking-wide text-white">KFC Food</h4>
                            <ul className="flex flex-col space-y-3">
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Menu</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Order Lookup</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Gift Card</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Nutrition &<br />Allergen</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="text-[13px] font-[900] tracking-wide text-white">Support</h4>
                            <ul className="flex flex-col space-y-3">
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Get Help</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Contact Us</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">KFC Feedback</a></li>
                                <li><a href="#" className="text-[13px] font-medium text-white/90 hover:text-white hover:underline underline-offset-2">Privacy Center</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Find A KFC */}
                    <div className="flex-shrink-0 mt-2 md:mt-0 xl:mr-10">
                        <div className="flex items-center gap-2 group cursor-pointer lg:pr-6 hover:opacity-80 transition-opacity">
                            <svg className="w-3.5 h-3.5 text-[#E4002B]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            <span className="text-[12px] font-[900] tracking-wide text-white underline underline-offset-2">Find A KFC</span>
                        </div>
                    </div>

                    {/* App Stores */}
                    <div className="flex flex-col gap-5 flex-shrink-0">
                        <a href="#" className="block hover:opacity-80 transition-opacity">
                            <img src={googlePlayBadge} alt="Google Play" className="h-[46px] border border-gray-500 rounded-lg p-[5px] px-3 w-[150px] object-contain" />
                        </a>
                        <a href="#" className="block hover:opacity-80 transition-opacity">
                            <img src={appStoreBadge} alt="App Store" className="h-[46px] border border-gray-500 rounded-lg p-[5px] px-3 w-[150px] object-contain" />
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-3 md:px-[60px] opacity-70">
                    <p className="text-[10px] font-medium tracking-wide mt-6 md:mt-0">
                        Copyright © KFC Corporation 2026 All rights reserved build pwa-2509-1-1_b7b0fc5b
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full border-[1px] border-white/40 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                            {/* Instagram */}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full border-[1px] border-white/40 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                            {/* Facebook */}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full border-[1px] border-white/40 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                            {/* Twitter */}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
