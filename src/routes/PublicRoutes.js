import React from "react";
import { Navigate} from "react-router-dom";
import { getToken } from "../services/AuthService";

const PublicRoute = ({ children }) => {
    return !getToken() ? children : <Navigate to="/" />;
}


export default PublicRoute