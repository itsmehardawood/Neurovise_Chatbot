'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/lib/translations';

export default function ChatbotWidget({ locale }) {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const t = useTranslation(locale);

  // Extract user_id from the JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserId(decoded.user_id);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !message.trim()) return;

    const userMessage = { text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('https://ecochatbot-production.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          user_id: userId,
          query: message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || t('chatError'));

      // Parse and format bot's response to include service details and prices
      const responseMessage = formatChatbotResponse(data.response);

      setMessages(prev => [...prev, { text: responseMessage, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [
        { text: err.message || t('chatError'), sender: 'bot', isError: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format chatbot response
  const formatChatbotResponse = (response) => {
    return response.split("\n").map((line, index) => (
      <p key={index} className="whitespace-pre-line">{line}</p>
    ));
  };

  return (
    <div className="flex flex-col h-[600px] max-w-full w-full sm:max-w-xl mx-auto mt-10 bg-white shadow-md rounded-2xl overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">{t('chatbotTitle')}</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              {t('chatWelcomeMessage')}
            </div>
          )}

          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : msg.isError 
                    ? 'bg-red-100 text-red-800 rounded-bl-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('askAnything')}
            className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          >
            {t('send')}
          </button>
        </div>
      </form>
    </div>
  );
}
