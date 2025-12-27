import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");
    const voterToken = localStorage.getItem("voterToken");

    if (!token && !voterToken) {
        return <Navigate to="/" replace />;
    }

    // If role is specified, check it
    if (role) {
        const storedRole = localStorage.getItem("role");

        if (storedRole !== role) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}
