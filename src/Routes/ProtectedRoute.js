import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  console.log(loading,isAuthenticated)

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;