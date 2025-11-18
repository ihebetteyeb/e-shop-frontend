import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./config";
import { ProtectedRoute } from "./protectedRoute";
import useAuth from "../hooks/useAuth";

function Routing() {
  const { token, isLoading } = useAuth();

  const finaleRoute = (route) => {
    if (route.public) return route.element;
    if (token && route.auth) {
      return <Navigate to="/home" />;
    }
    return route.element;
  };

  return (
    <Routes>
      {routes.map((route) => {
        if (route.children) {
          const { path } = route;
          return (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children.map((childRoute) => (
                <Route
                  key={`${path}${childRoute.path}`}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          );
        }
        return (
          <Route
            path={route.path}
            element={
              route.auth || route.public ? (
                finaleRoute(route)
              ) : (
                <ProtectedRoute>{route.element}</ProtectedRoute>
              )
            }
            key={route.path}
          />
        );
      })}
    </Routes>
  );
}

export default Routing;
