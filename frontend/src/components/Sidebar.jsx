const Sidebar = ({
  setSelectedUser,
  users,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-3/4 md:w-1/4 h-screen bg-[#1b1b1b] p-4 overflow-y-auto border-r border-gray-700 z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform md:relative md:translate-x-0`}>
      <h2 className="text-xl font-bold text-gray-300 mb-4">QuickChat</h2>
      <button
        className="md:hidden absolute top-4 right-4 text-white"
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
