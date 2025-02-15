import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AuthForm = ({
  type,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  userName,
  setUserName,
  imageUrl,
  setImageUrl,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url); // Store Cloudinary image URL
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleForm = () => {
    type === "login" ? navigate("/register") : navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#181818] text-gray-200 rounded-xl shadow-lg w-96 space-y-4 border border-[#333]">
      <h2 className="text-2xl font-semibold text-center text-gray-100">
        {type === "login" ? "Login" : "Register"}
      </h2>

      {type === "register" && (
        <div className="flex flex-col items-center space-y-3">
          {/* Profile Image Upload */}
          <label htmlFor="imageUpload" className="relative cursor-pointer">
            <div className="w-20 h-20 rounded-full border-2 border-[#4a90e2] bg-[#222] flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  {uploading ? "Uploading..." : "Upload"}
                </span>
              )}
            </div>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-[#444] rounded-lg bg-[#222] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        id="email"
        className="w-full p-3 border border-[#444] rounded-lg bg-[#222] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full p-3 border border-[#444] rounded-lg bg-[#222] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-[#6b7280] hover:text-[#94a3b8]"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <AiFillEyeInvisible size={22} />
          ) : (
            <AiFillEye size={22} />
          )}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#2563eb] hover:to-[#60a5fa] text-white p-3 rounded-lg transition font-semibold shadow-md hover:shadow-lg">
        {type === "login" ? "Login" : "Register"}
      </button>

      {/* Navigation Link to Switch Forms */}
      <p className="text-center text-gray-400">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <span
          className="text-blue-400 cursor-pointer hover:text-blue-500 transition ml-1"
          onClick={toggleForm}>
          {type === "login" ? "Register" : "Login"}
        </span>
      </p>
    </form>
  );
};

export default AuthForm;
