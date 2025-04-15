'use client';

import BackButton from "@/app/components/BackButton";
import ChatbotWidget from "@/app/components/chatbot_widget";
import { useTranslation } from "@/lib/translations"; // Adjust path as necessary
import Image from "next/image";
import { useParams } from "next/navigation"; // Importing the useParams hook

export default function ChatbotWidgetPage() {
  const params = useParams();
  const locale = params?.locale;
  const t = useTranslation(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-white to-blue-500 px-4 py-12 relative">
      {/* Logo in top-left corner */}
      <div className="absolute top-4 left-4">
        <Image
          src="/images/logo.png"
          height={180}
          width={180}
          alt="this is our logo"
          className="object-contain"
        />
      </div>

      {/* Main content centered */}
      <div className="flex flex-col items-center justify-center mt-20">
        <BackButton />

        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            {t("chatbotPageTitle")}
          </h2>
          <ChatbotWidget locale={locale} />
        </div>
      </div>
    </div>
  );
}
