'use client';

import { useEffect, useState } from 'react';
import { getUserIdFromToken } from '../lib/utils';

export default function GenerateCodePage() {
  const [businessId, setBusinessId] = useState('');

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) setBusinessId(id);
  }, []);

  const scriptTag = `<script src="http://localhost:3000/chatbot-widget.js" data-business-id="${businessId}" defer></script>`;

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Embed Your Chatbot</h1>
      {businessId ? (
        <>
          <p className="mb-2">Copy this code and paste into your website:</p>
          <pre className="bg-gray-100 p-4 rounded font-mono overflow-x-auto text-black">{scriptTag}</pre>
        </>
      ) : (
        <p>Loading business ID...</p>
      )}
    </div>
  );
}
