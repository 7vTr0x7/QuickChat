const Sidebar = ({ setSelectedUser, users }) => {
  return (
    <div className="w-1/4 bg-[#1b1b1b] h-screen p-4 overflow-y-auto border-r border-gray-700">
      <h2 className="text-xl font-bold text-gray-300 mb-4">QuickChats</h2>
      {(users || []).map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer 
                     hover:bg-[#2a2a2a] transition transform hover:scale-105">
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
