import React, { createContext, useState, useContext } from "react";

type AuthContextType = {
    user: string | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        // Call your backend login API
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        setUser(username);
        setToken(data.token);
    };

    const register = async (username: string, password: string) => {
        // Call your backend register API
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error("Registration failed");

        // Optionally auto-login after register
        await login(username, password);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
