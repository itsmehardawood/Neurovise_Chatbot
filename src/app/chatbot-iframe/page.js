'use client';

import { useSearchParams } from 'next/navigation';
import ChatbotWidget from '../components/chatbot_widget';

export default function ChatbotIframe() {
  const searchParams = useSearchParams();
  const businessId = searchParams.get('business_id');

  if (!businessId) return <p>No business ID provided</p>;

  return (
    <div className="w-full h-full">
      <ChatbotWidget business_id={businessId} embedded />
    </div>
  );
}
