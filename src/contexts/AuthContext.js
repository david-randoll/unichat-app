import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            var result = await getRedirectResult(auth);
            setUser(result.user);
            setLoading(false);
            if (result.user) {
                navigate("/chats");
            }
        };
        handleAuth();
    }, [user, navigate]);

    const value = { user, loading, setLoading };

    // return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
