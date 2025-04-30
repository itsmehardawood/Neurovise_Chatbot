"use client";

import { useState, useEffect } from "react";
import { useTranslation } from '@/lib/translations';

export default function ScriptGenerator({ locale }) {
  const [userId, setUserId] = useState("");
  const [scriptTag, setScriptTag] = useState("");

  const t = useTranslation(locale);

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
    const script = `<script src="https://echo-chatbot-eight.vercel.app/${locale}/api/chatbot-widget?userId=${userId}" async></script>`;
    setScriptTag(script);
  };

  return (
    <div className="">
      <button
        onClick={generateScript}
        className="bg-blue-600 text-white px-24 py-3 rounded-xl"
      >
            {t('GenerateScriptTag')}  
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
