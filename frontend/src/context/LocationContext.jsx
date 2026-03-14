import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [fulfillmentMode, setFulfillmentMode] = useState(null); // 'delivery' or 'pickup'

    const updateLocation = (newAddress, newCoordinates = null) => {
        setAddress(newAddress);
        if (newCoordinates) {
            setCoordinates(newCoordinates);
        }
    };

    const clearLocation = () => {
        setAddress('');
        setCoordinates(null);
    };

    const openOrderModal = () => setIsOrderModalOpen(true);
    const closeOrderModal = () => setIsOrderModalOpen(false);

    return (
        <LocationContext.Provider value={{
            address,
            coordinates,
            isOrderModalOpen,
            fulfillmentMode,
            setFulfillmentMode,
            updateLocation,
            clearLocation,
            openOrderModal,
            closeOrderModal
        }}>
            {children}
        </LocationContext.Provider>
    );
};
