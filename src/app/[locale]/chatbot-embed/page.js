"use client";

import ChatbotWidget from "@/app/components/chatbot_widget";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatbotEmbedPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = searchParams.get("userId");
    setUserId(id);
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure the component doesn't render until it's mounted to avoid hydration mismatch
  if (!mounted) {
    return null; // Prevent rendering before mounting
  }

  // Ensure userId exists before rendering the ChatbotWidget
  if (!userId) return null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent m-0 p-0">
      <ChatbotWidget 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} // Handle closing the widget
        propUserId={userId}
        locale="en"
      />
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} // Button to reopen the widget
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full"
        >
          Open Chat
        </button>
      )}
    </div>
  );
}
