import React from "react";
import { UserAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { session, isAuthLoading } = UserAuth();

    if (isAuthLoading) {
        return <div className="p-6 text-sm text-muted-foreground">Checking session...</div>;
    }

    return <>{session ? <>{children}</> : <Navigate to="/signin" replace />}</>;
};

export default PrivateRoute;