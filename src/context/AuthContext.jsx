import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // wait for user to load

    const login = async (username, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            await fetchUser(); // fetch user info after login
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('access');
        if (!token) {
            setLoading(false);
            return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/user/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data);
        } else {
            logout();
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const contextValue = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
