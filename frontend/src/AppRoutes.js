import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Login from './components/login/login';
import Home from './components/home/home';

import { AuthProvider, Auth } from "./auth/auth";

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(Auth)

        if (loading) {
            return <div className="loading">Carregando..</div>
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;

    }
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />

                    <Route exact path="/courses" element={
                        <Private>
                            <Home />
                        </Private>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    )
}


export default AppRoutes;