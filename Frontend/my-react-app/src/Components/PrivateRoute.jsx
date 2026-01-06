import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

export default function PrivateRoute({ children, adminOnly = false }) {
  if (!isLoggedIn()) return <Navigate to="/" />;
  
  // For admin routes, check role (assuming role is stored in localStorage or decode token)
  // For simplicity, since token has role, but to avoid decoding, perhaps store role in localStorage
  if (adminOnly && localStorage.getItem("role") !== "admin") return <Navigate to="/user" />;
  
  return children;
}