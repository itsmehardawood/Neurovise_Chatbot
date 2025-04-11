// 'use client'
// import { useState, useEffect, useRef } from "react";
// import { PaperPlaneIcon } from "@radix-ui/react-icons";
// import { Configuration, OpenAIApi } from "openai";

// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Add your API key to .env
//   })
// );

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const chatRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ role: "bot", text: "Hi there! How can I help you today?" }]);
//   }, []);

//   useEffect(() => {
//     chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const response = await openai.createChatCompletion({
//         model: "gpt-4", // Specify the model you want to use
//         messages: newMessages.map(({ role, text }) => ({ role, content: text })),
//       });

//       const botMessage = response.data.choices[0].message.content;
//       setMessages((prev) => [...prev, { role: "bot", text: botMessage }]);
//     } catch (error) {
//       console.error("Error with OpenAI API:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "Oops! Something went wrong. Please try again later." },
//       ]);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50 text-black">
//       {isOpen ? (
//         <div className="w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
//           <div className="bg-blue-600 text-white p-4 font-semibold">Chat with Us</div>

//           <div ref={chatRef} className="flex-1 p-2 space-y-2 overflow-y-auto">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-xl max-w-[80%] text-sm whitespace-pre-line ${
//                   msg.role === "user"
//                     ? "bg-blue-100 self-end ml-auto"
//                     : "bg-gray-100 self-start mr-auto"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center border-t px-2 py-2">
//             <input
//               className="flex-1 p-2 text-sm border rounded-xl focus:outline-none"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//               onClick={handleSend}
//             >
//               <PaperPlaneIcon />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button
//           className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700"
//           onClick={() => setIsOpen(true)}
//         >
//           Chat
//         </button>
//       )}
//     </div>
//   );
// }