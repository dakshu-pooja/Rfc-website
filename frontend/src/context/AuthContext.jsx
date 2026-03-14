import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Load user from localStorage on init
    useEffect(() => {
        const savedUser = localStorage.getItem('kfc_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (phone) => {
        const mockUser = {
            phone,
            name: 'KFC Fan',
            id: 'user_' + Math.random().toString(36).substr(2, 9)
        };
        setUser(mockUser);
        localStorage.setItem('kfc_user', JSON.stringify(mockUser));
        setIsAuthModalOpen(false); // Close modal on successful login
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kfc_user');
    };

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            loading,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
