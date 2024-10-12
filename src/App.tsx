import Sidebar from "./components/Sidebar/Sidebar";
import "./main.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import routes from "./routes";
import Header from "./components/Header/Header";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { observeAuthState } from "./services/firebase";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        setAuthUser(user);
        if (
          (location.pathname === "/login" ||
            location.pathname !== "/register") &&
          !!user
        ) {
          navigate("/");
        }
      } else {
        setAuthUser(null);
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  return (
    <div className="app-container">
      {authUser && <Sidebar />}

      <div className="main-content">
        {authUser && <Header />}
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.path === "/login" || route.path === "/register" ? (
                  <route.element />
                ) : (
                  <PrivateRoute
                    isAuthenticated={!!authUser}
                    element={route.element}
                  />
                )
              }
            />
          ))}
          <Route
            path="*"
            element={
              <PrivateRoute
                isAuthenticated={!!authUser}
                element={routes.find((route) => route.path === "/")?.element}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
