'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SystemPromptModal({ isOpen, onClose }) {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPrompt = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(
        'http://localhost:8000/system-prompt',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSystemPrompt(res.data.system_prompt);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchPrompt();
  }, [isOpen]);

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");

    try {
      setLoading(true);
      const response = await axios.put(
        'http://localhost:8000/business-service/system-prompt',
        { system_prompt: systemPrompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Save successful', response.data);
      onClose();
    } catch (error) {
      console.error('Save error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');

      await axios.delete(
        'http://localhost:8000/business-service/system-prompt',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSystemPrompt('');
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex text-black items-center justify-center bg-black/50 px-4 py-6 sm:px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Edit System Prompt</h2>
        <textarea
          value={systemPrompt || ''}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="w-full h-60 sm:h-64 p-3 sm:p-4 text-base sm:text-lg border border-gray-300 rounded-xl resize-none"
        />
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <button
            onClick={handleDelete}
            className="w-full sm:w-auto px-5 py-3 bg-red-600 text-white text-base font-medium rounded-xl hover:bg-red-700 transition disabled:opacity-50"
            disabled={loading}
          >
            Delete
          </button>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 border border-gray-400 text-base font-medium rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-3 bg-blue-700 text-white text-base font-medium rounded-xl hover:bg-blue-800 transition disabled:opacity-50"
              disabled={loading}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
