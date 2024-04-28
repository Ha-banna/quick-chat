// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import AppContext from '../context/AppContext';

export default function ProtectedRoute(props) {
    const app = useContext(AppContext);
    const auth = getAuth(app);

    // Check authentication status here
    const isAuthenticated = auth.currentUser !== null;

    if (isAuthenticated) {
        return props.children;
    } else {
        // Redirect to login page if not authenticated
        return <Navigate to="/" />;
    }
}
