import { useNavigate } from "react-router-dom";

const Sidebar = ({
  setSelectedUser,
  users,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-3/4 md:w-1/4 h-screen bg-[#1b1b1b] p-4 overflow-y-auto border-r border-gray-700 z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform md:relative md:translate-x-0`}>
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-xl font-bold text-gray-300">QuickChat</h2>
        <button
          onClick={handleLogout}
          className="text-white bg-[#2a2a2a] px-3 py-1 md:mx-0 mx-10 rounded-lg text-sm md:relative">
          Logout
        </button>
      </div>

      <button
        className="md:hidden absolute top-3 right-2 text-white bg-[#333] p-2 rounded-full"
        onClick={() => setIsSidebarOpen(false)}>
        ✖
      </button>

      {(users || []).map((user) => (
        <div
          key={user._id}
          onClick={() => {
            setSelectedUser(user);
            setIsSidebarOpen(false);
          }}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition transform hover:scale-105">
          <img
            src={user.imageUrl}
            alt={user.userName}
            className="w-12 h-12 rounded-full border-2 border-green-400"
          />
          <p className="text-white text-lg">{user.userName}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
