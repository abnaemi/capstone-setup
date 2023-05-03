import { Navigate, Outlet } from "react-router-dom";

type Props = {
    user?: string;
    isLoading: boolean;
};

export default function ProtectedRoutes({ user, isLoading }: Props) {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/report" />;
}
