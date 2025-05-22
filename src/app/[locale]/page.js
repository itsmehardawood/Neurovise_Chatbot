"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/translations";
import Image from "next/image";
import ChatbotWidget from "../components/chatbot_widget";
import WhatsAppButton from "../components/Whatspp";
import ScriptGenerator from "../components/ScriptGenrator";
import Navbar from "../components/Navbar";
import SystemPromptButton from "../components/SystemPromptButton";

export default function HomePage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');

  const params = useParams();
  const locale = params?.locale || "he";
  const t = useTranslation(locale);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push(`/${locale}/login`);
    } else {
      setLoading(false);
    }
  }, [locale, router]);

  const decodeJWT = (token) => {
    // Decodes the JWT and extracts the payload
    const base64Url = token.split(".")[1]; // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Decode base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload); // Return the decoded payload as an object
  };

 

  if (loading) return <p>{t("loading")}</p>;

  return (
    <>
      {/* 🔒 Floating logout button */}
      <div className="">
        {/* <LogoutButton />
        <LanguageButton /> */}

        <Navbar/>

      </div>

      {/* 📄 Main content */}

      <div className=" bg-cyan-900 bg-gradient-to-tl  via-transparent  rtl:bg-gradient-to-br from-cyan-600 to-cyan-900  min-h-screen  text-white flex flex-col py-24 items-center gap-6 p-6 relative">
          <div>
          <Image
          src="/images/pic.png"
          height={300}
          width={250}
          alt="this is our logo"
          priority
        />
          </div>

        {/* Floating button to toggle the chat widget */}
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-50"
        >
          <span className="text-2xl">💬</span>
        </div>

        {/* Conditionally render the chatbot widget */}
        {isChatOpen && (
          <ChatbotWidget
            locale={locale}
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}

        {/* WhatsApp floating button */}
        <WhatsAppButton />

        <h1 className="text-4xl font-bold mb-6 drop-shadow">{t("welcome")}</h1>

        <div className="flex flex-col gap-4 w-full max-w-xs justify-center items-center">



          <button
            onClick={() => router.push(`/${locale}/admin-panel`)}
            className="w-full px-3 py-3 rounded-2xl bg-gray-900 hover:bg-gray-700 transition duration-300 shadow-md"
          >
            {t("AdminPanel")}
          </button>

          <button
            onClick={() => router.push(`/${locale}/business-service`)}
            className="w-full px-3 py-3 rounded-2xl bg-gray-900 hover:bg-gray-700 transition duration-300 shadow-md"
          >
            {t("manageBusiness")}
          </button>

          <SystemPromptButton locale={locale}/>


          {/* Button to generate script tag */}
          <ScriptGenerator userId={userId} locale={locale}  />
                    

       
        </div>
      </div>
    </>
  );
}
