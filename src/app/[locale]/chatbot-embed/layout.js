"use client";

export default function ChatbotEmbedLayout({ children }) {
  return (
    <div
      className="chatbot-embed-layout"
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
