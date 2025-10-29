"use client";

import ChatbotWidget from "@/app/components/chatbot_widget";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatbotEmbedPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = searchParams.get("userId");
    setUserId(id);
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
    console.log("ChatbotEmbedPage mounted, isOpen:", false);
  }, []);

  // Ensure the component doesn't render until it's mounted to avoid hydration mismatch
  if (!mounted) {
    return null; // Prevent rendering before mounting
  }

  // Ensure userId exists before rendering the ChatbotWidget
  if (!userId) return null;

  return (
    <>
      {console.log("Rendering ChatbotWidget with isOpen:", isOpen)}
      <ChatbotWidget 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} // Handle closing the widget
        onOpen={() => setIsOpen(true)} // Handle opening the widget
        propUserId={userId}
        locale="en"
      />
    </>
  );
}
