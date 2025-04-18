'use client';

import ChatbotWidget from '@/app/components/chatbot_widget';
import { useSearchParams } from 'next/navigation';

export default function WidgetPage() {
  const searchParams = useSearchParams();
  const businessId = searchParams.get('business_id');

  return (
    <div className="h-screen w-screen">
      <ChatbotWidget businessId={businessId} locale="he" isOpen={true} />
    </div>
  );
}
