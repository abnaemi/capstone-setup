import { Outlet } from "react-router-dom";
import { Navigate } from "react-router";

type Props = {
    user?: string;
    isLoading: boolean;
};

const ProtectedRoutes = ({ user, isLoading }: Props) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
