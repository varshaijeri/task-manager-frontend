import React, {type JSX} from "react";
import { Navigate } from "react-router-dom";
import {getToken} from "./authService.ts";


interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = getToken();
    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
