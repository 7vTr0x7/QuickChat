import { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className="bg-black h-screen">
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" replace /> : <Register />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Chat />} />
          </Route>

          <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
