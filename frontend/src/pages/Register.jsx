import { useState } from "react";
import toast from "react-hot-toast";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const validateInputs = () => {
    if (!userName.trim()) {
      toast.error("Username cannot be empty.");
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (!imageUrl) {
      toast.error("Please select profile image");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const loadingToast = toast.loading("Registering...");

    try {
      const res = await fetch(`${apiUrl}/api/auth/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName, imageUrl, email, password }),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success("Registration successful!", { duration: 2000 });
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <AuthForm
        type="register"
        handleSubmit={handleRegister}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        userName={userName}
        setUserName={setUserName}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </div>
  );
};

export default Register;
