import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../redux/slices/usersSlice";
import { userProfile } from "../redux/slices/profileSlice";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.profile);

  const filteredUsers = users ? users.filter((us) => us._id !== user?._id) : [];

  useEffect(() => {
    dispatch(userProfile());
    dispatch(allUsers());
  }, [dispatch]);

  if (loading) return <p className="text-white">Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <Sidebar setSelectedUser={setSelectedUser} users={filteredUsers} />
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow selectedUser={selectedUser} user={user} />
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
