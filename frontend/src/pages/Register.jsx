import { useState } from "react";
import toast from "react-hot-toast";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, imageUrl, email, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Registration successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
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
