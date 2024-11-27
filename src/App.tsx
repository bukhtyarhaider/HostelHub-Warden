import Sidebar from "./components/Sidebar/Sidebar";
import "./main.scss";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="app-container">
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Sidebar />
      )}

      <div className="main-content">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Header />}
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.path === "/login" || route.path === "/register" ? (
                  <route.element />
                ) : (
                  <PrivateRoute element={route.element} />
                )
              }
            />
          ))}
          <Route
            path="*"
            element={
              <PrivateRoute
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
