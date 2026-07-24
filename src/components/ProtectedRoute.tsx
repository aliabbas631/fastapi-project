import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import type { JSX } from "react";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({
    children,
}: Props) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    return children;
}