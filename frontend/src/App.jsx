import { Toaster } from "react-hot-toast";
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

const App = () => {
  const token = localStorage.getItem("token");

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
