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
        const res = await fetch(`https://ecochatbot-production.up.railway.app/chat-sessions/${userId}`);
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
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
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
    <div className="overflow-y-auto max-h-[80vh] relative p-2">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-sm">
        <thead className="bg-gray-100">
          <tr className="text-xl">
            <th className="text-left py-2 px-3 border-b">Name</th>
            <th className="text-left py-2 px-3 border-b">Email</th>
            <th className="text-left py-2 px-3 border-b">Phone</th>
            <th className="text-left py-2 px-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center py-4">Loading...</td>
            </tr>
          ) : chatSessions.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">No chat sessions found.</td>
            </tr>
          ) : (
            chatSessions.map((session) => (
              <tr key={session._id} className="text-lg">
                <td className="py-2 px-3 border-b">{session.full_name}</td>
                <td className="py-2 px-3 border-b">{session.email}</td>
                <td className="py-2 px-3 border-b">{session.phone_number}</td>
                <td className="py-2 px-3 border-b">
                  <button
                    onClick={() => openModal(session)}
                    className="hover:text-blue-700 text-blue-900 text-3xl"
                    title="View Chat"
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[80%] overflow-y-auto relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-600"
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Chat History with {selectedSession.full_name}
            </h2>
            <div className="space-y-6">
              {selectedSession.messages.map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="bg-blue-100 text-blue-900 p-3 rounded-lg self-start max-w-[70%]">
                    <strong>{selectedSession.full_name}:</strong> {msg.query}
                  </div>
                  <div className="text-sm text-gray-500 mb-1 self-start">
                    {formatDateTime(msg.timestamp)}
                  </div>
                  <div className="bg-green-100 text-green-900 p-3 rounded-lg self-end max-w-[70%]">
                    <strong>Bot:</strong> {msg.response}
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


// 'use client'
// import React, { useEffect, useState } from "react";
// import { IoIosChatboxes } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";

// const ChatHistory = () => {
//   const [chatSessions, setChatSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedSession, setSelectedSession] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       try {
//         const decoded = JSON.parse(atob(token.split(".")[1]));
//         setUserId(decoded.user_id);
//       } catch (err) {
//         console.error("Error decoding token:", err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchChatSessions = async () => {
//       try {
//         const res = await fetch(`https://a291-119-73-112-213.ngrok-free.app/chat-sessions/${userId}`);
        
//         // Log the raw response as text
//         const text = await res.text();
//         console.log("Raw response:", text);  // Check what you're receiving
    
//         // Try parsing the text as JSON
//         const data = JSON.parse(text);
//         setChatSessions(data.chat_sessions || []);
//       } catch (err) {
//         console.error("Error fetching chat sessions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
    

//     fetchChatSessions();
//   }, [userId]);

//   const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: false,
//     });
//   };

//   const openModal = (session) => {
//     setSelectedSession(session);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedSession(null);
//   };

//   return (
//     <div className="overflow-y-auto max-h-[80vh] relative p-2">
//       <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-sm">
//         <thead className="bg-gray-100">
//           <tr className="text-xl">
//             <th className="text-left py-2 px-3 border-b">Name</th>
//             <th className="text-left py-2 px-3 border-b">Email</th>
//             <th className="text-left py-2 px-3 border-b">Phone</th>
//             <th className="text-left py-2 px-3 border-b">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="8" className="text-center py-4">Loading...</td>
//             </tr>
//           ) : chatSessions.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center py-4">No chat sessions found.</td>
//             </tr>
//           ) : (
//             chatSessions.map((session) => (
//               <tr key={session._id} className="text-lg">
//                 <td className="py-2 px-3 border-b">{session.full_name}</td>
//                 <td className="py-2 px-3 border-b">{session.email}</td>
//                 <td className="py-2 px-3 border-b">{session.phone_number}</td>
//                 <td className="py-2 px-3 border-b">
//                   <button
//                     onClick={() => openModal(session)}
//                     className="hover:text-blue-700 text-blue-900 text-3xl"
//                     title="View Chat"
//                   >
//                     <IoIosChatboxes />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Chat Modal */}
//       {isModalOpen && selectedSession && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
//             >
//               <IoMdClose />
//             </button>
//             <h2 className="text-2xl font-bold mb-4">
//               Chat with {selectedSession.full_name}
//             </h2>
//             <div className="space-y-4">
//               {selectedSession.messages?.map((msg, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                   <p className="text-sm text-gray-500 mb-1">{formatDateTime(msg.timestamp)}</p>
//                   <p><strong>User:</strong> {msg.query}</p>
//                   <p><strong>Bot:</strong> {msg.response}</p>
//                   {msg.is_scheduling && msg.event_details && (
//                     <div className="mt-2 p-2 bg-green-100 rounded text-green-800 text-sm">
//                       <p><strong>Scheduled:</strong> {msg.event_details.status}</p>
//                       <p><strong>Meet Link:</strong> <a href={msg.event_details.meet_link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{msg.event_details.meet_link}</a></p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;
