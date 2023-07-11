import React, { useState, useEffect, createContext } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { api, createSession } from '../services/api'

export const Auth = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('token');

        if (recoveredUser) {
            setUser(recoveredUser);
        }

        setLoading(false)
    }, [])

    const logar = async (email, senha) => {
        try {
            const response = await createSession(email, senha)
            console.log("LOGIN Auth: data ", response.data.token)
            const { token } = response.data;

            // localStorage.setItem("user", user)
            localStorage.setItem("token", token)

            api.defaults.headers.token = `${token}`

            // setUser(user)
            navigate("/home")
        } catch (err) {
            console.log("ERRO===>", err)
            toast.error(err.response.data.message)
        }


    }

    const logout = () => {
        console.log("LOGOUT")
        localStorage.removeItem('token')
        api.defaults.headers.token = null
        setUser(null)
        navigate("/login")
    }

    return (
        <>
            <Auth.Provider value={{ authenticated: !!user, user, loading, logar, logout }}>
                {children}
            </Auth.Provider>

            <ToastContainer autoClose={4000} position={toast.POSITION.TOP_CENTER} />

        </>
    )
}