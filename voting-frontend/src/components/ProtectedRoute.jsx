import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children , isAdmin}) => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    if(!token){
        return <Navigate to={'/login'} replace/>
    }

    if(isAdmin && role !=="admin"){
        return <Navigate to="/" replace/>
    }
    return children;
};

export default ProtectedRoute
