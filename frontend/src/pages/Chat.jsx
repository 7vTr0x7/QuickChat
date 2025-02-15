import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../redux/slices/usersSlice";
import { userProfile } from "../redux/slices/profileSlice";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.profile);

  const filteredUsers = users ? users.filter((us) => us._id !== user?._id) : [];

  useEffect(() => {
    dispatch(userProfile());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-[#121212] text-white relative">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
          isSidebarOpen ? "block" : "hidden"
        } md:hidden`}
        onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar
        setSelectedUser={setSelectedUser}
        users={filteredUsers}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        {!selectedUser ? (
          <div className="flex items-center justify-center flex-1 text-gray-400">
            Select a user to start chatting
          </div>
        ) : (
          <ChatWindow selectedUser={selectedUser} user={user} />
        )}
      </div>
      {!isSidebarOpen && !selectedUser && (
        <button
          className="md:hidden fixed top-4 left-4 bg-[#1f1f1f] text-white p-2 rounded-lg z-50"
          onClick={() => setIsSidebarOpen(true)}>
          ☰
        </button>
      )}
    </div>
  );
};

export default Chat;
