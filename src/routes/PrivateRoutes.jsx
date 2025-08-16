import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders/AuthProvider";
import Loading from "../pages/shared/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children;
    }

    return (
        <Navigate to={'/login'} state={{ form: location }} replace></Navigate>
    );
};

export default PrivateRoutes;