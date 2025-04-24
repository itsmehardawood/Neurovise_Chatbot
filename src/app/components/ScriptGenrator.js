"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ScriptGenerator() {
  const [userId, setUserId] = useState("");
  const [scriptTag, setScriptTag] = useState("");

  const params = useParams();
  const locale = params?.locale || "en"; // fallback if locale not found

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.user_id);
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
  }, []);

  const generateScript = () => {
    const script = `<script src="https://ecochatbot-production.up.railway.app/${locale}/api/chatbot-widget?userId=${userId}" async></script>`;
    setScriptTag(script);
  };

  return (
    <div className="p-4">
      <button
        onClick={generateScript}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Generate Chatbot Script
      </button>

      {scriptTag && (
        <div className="mt-4">
          <p className="mb-2 font-semibold">Copy and paste this script:</p>
          <textarea
            value={scriptTag}
            readOnly
            rows={6}
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>
      )}
    </div>
  );
}
