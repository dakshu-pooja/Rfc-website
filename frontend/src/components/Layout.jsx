import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import LocationBar from './LocationBar';
import OrderModesBar from './OrderModesBar';
import StartOrderModal from './StartOrderModal';
import DeliveryAddressModal from './DeliveryAddressModal';
import StoreSelectionModal from './StoreSelectionModal';
import ScheduleOrderModal from './ScheduleOrderModal';
import AuthModal from './AuthModal';
import SuccessToast from './SuccessToast';
import Footer from './Footer';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { isOrderModalOpen, openOrderModal, closeOrderModal } = useLocation();
    const { openAuthModal } = useAuth();
    const navigate = useNavigate();

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [orderType, setOrderType] = useState('Delivery');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSelectDelivery = () => {
        closeOrderModal();
        setIsAddressModalOpen(true);
    };

    const handleSelectStore = () => {
        closeOrderModal();
        setIsStoreModalOpen(true);
    };

    const handleBackToOrder = () => {
        setIsAddressModalOpen(false);
        setIsStoreModalOpen(false);
        openOrderModal();
    };

    const handleSignIn = () => {
        closeOrderModal();
        setIsAddressModalOpen(false);
        setIsStoreModalOpen(false);
        openAuthModal();
    };

    const handleStartOrder = () => {
        openOrderModal();
    };

    return (
        <div className="min-h-screen bg-white">
            <StartOrderModal
                isOpen={isOrderModalOpen}
                onClose={closeOrderModal}
                onSelectDelivery={handleSelectDelivery}
                onSelectStore={handleSelectStore}
            />
            <DeliveryAddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onBack={handleBackToOrder}
                onSignIn={handleSignIn}
                onUseLocation={() => setIsAddressModalOpen(true)}
                onConfirmLocation={(location) => {
                    setSelectedLocation(location);
                    setOrderType('Delivery');
                    setIsAddressModalOpen(false);
                    setIsScheduleModalOpen(true);
                }}
            />
            <StoreSelectionModal
                isOpen={isStoreModalOpen}
                onClose={() => setIsStoreModalOpen(false)}
                onBack={handleBackToOrder}
                onSignIn={handleSignIn}
                onSelectStore={(location) => {
                    setSelectedLocation(location);
                    setOrderType('Store Pickup');
                    setIsStoreModalOpen(false);
                    setIsScheduleModalOpen(true);
                }}
            />
            <ScheduleOrderModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                onBack={() => {
                    setIsScheduleModalOpen(false);
                    if (orderType === 'Delivery') setIsAddressModalOpen(true);
                    else setIsStoreModalOpen(true);
                }}
                location={selectedLocation}
                orderType={orderType}
                onConfirm={() => {
                    setIsScheduleModalOpen(false);
                    setToastMessage(`Your location is set to ${selectedLocation === 'Current Location' ? 'KFC - Sattva Divinity Mall' : selectedLocation} and you're ordering for ${orderType.toUpperCase()}`);
                    setShowToast(true);
                }}
            />
            <SuccessToast
                isVisible={showToast}
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
            <AuthModal />

            <div className="fixed top-0 left-0 right-0 z-[70] bg-white w-full shadow-sm">
                <LocationBar onSetLocation={() => setIsAddressModalOpen(true)} />
                <Navbar />
                <OrderModesBar onStartOrder={handleStartOrder} />
            </div>

            <main className="pt-[210px]">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
