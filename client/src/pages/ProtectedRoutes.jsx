import{ jwtDecode} from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  let isValid = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // Perform additional checks here if needed, e.g., token expiration
      isValid = !!decodedToken;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
