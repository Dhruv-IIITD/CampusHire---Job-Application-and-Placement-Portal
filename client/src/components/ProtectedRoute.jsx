import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDashboardPath } from "../services";

const ProtectedRoute = ({ children, roles }) => {
  const user = useSelector((state) => state.userDetail);

  if (!user.jwtToken) {
    return <Navigate to="/login" replace />;
  }

  if (roles?.length && !roles.includes(user.accountType)) {
    return <Navigate to={getDashboardPath(user.accountType)} replace />;
  }

  return children;
};

export default ProtectedRoute;
