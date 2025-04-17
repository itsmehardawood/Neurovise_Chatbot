import React, { useEffect, useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const ChatHistory = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.user_id);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchChatSessions = async () => {
      try {
        const res = await fetch(`http://localhost:8000/chat-sessions/${userId}`);
        const data = await res.json();
        setChatSessions(data.chat_sessions || []);
      } catch (err) {
        console.error("Error fetching chat sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatSessions();
  }, [userId]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const openModal = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <div className="overflow-x-auto relative">
      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 border-b">Username</th>
            <th className="text-left py-3 px-4 border-b">Email</th>
            <th className="text-left py-3 px-4 border-b">Date & Time</th>
            <th className="text-left py-3 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center">
                Loading...
              </td>
            </tr>
          ) : chatSessions.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center">
                No chat sessions found.
              </td>
            </tr>
          ) : (
            chatSessions.map((session) => (
              <tr key={session._id}>
                <td className="py-3 px-4 border-b">{session.full_name}</td>
                <td className="py-3 px-4 border-b">{session.email}</td>
                <td className="py-3 px-4 border-b">{formatDateTime(session.created_at)}</td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => openModal(session)}
                    className="hover:text-blue-700 text-blue-900 text-3xl px-4 py-2 rounded"
                  >
                  <IoIosChatboxes />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[80%] overflow-y-auto relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-600"
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <h2 className="text-xl font-semibold mb-4">Chat History with {selectedSession.full_name}</h2>
            <div className="space-y-4">
              {selectedSession.messages.map((msg, idx) => (
                <div key={idx}>
                  <div className="text-sm text-gray-500 mb-1">
                    {formatDateTime(msg.timestamp)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-blue-100 text-blue-900 p-3 rounded-lg self-start max-w-[70%]">
                      <strong>User:</strong> {msg.query}
                    </div>
                    <div className="bg-green-100 text-green-900 p-3 rounded-lg self-end max-w-[70%]">
                      <strong>Bot:</strong> {msg.response}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
