import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true, //Necessary because we are working with cookies
        })
        setCurrentUser(res.data)
    };

    const logout = () => {
        // Perform logout logic, such as clearing localStorage, etc.
        setCurrentUser(null); // Assuming setCurrentUser is used to clear the currentUser state
    }; 

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};
