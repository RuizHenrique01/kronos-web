import { Outlet, Navigate } from "react-router";


const AuthGuardRoute = () => {
    
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to='/inicio' />;
    }
    
    return <Outlet />;
}

export default AuthGuardRoute;