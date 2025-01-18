import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);



    return (
        <AuthContext.Provider
        value={{
            loading,
            setLoading
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};