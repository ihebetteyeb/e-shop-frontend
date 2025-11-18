import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    console.log(token);
  }, [token]);

  if (isLoading) {
    return <p> Loading...</p>;
  }
  if (!token) {
    console.log("this is from protected route ");
    return <Navigate to={"/signin"} />;
  }
  return children;
}
