'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SystemPromptModal({ isOpen, onClose }) {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch the system prompt when the modal opens
  const fetchPrompt = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Token from local storage
      const res = await axios.get('http://localhost:8000/business-service/system-prompt', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSystemPrompt(res.data.system_prompt); // Set the fetched system prompt
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchPrompt(); // Fetch the prompt when the modal opens
  }, [isOpen]);

  // Save the updated system prompt
  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
  
    try {
      setLoading(true); // Set loading state to true while saving
      const response = await axios.put(
        "http://localhost:8000/business-service/system-prompt",
        { system_prompt: systemPrompt }, // Ensure the body is in the correct format
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Save successful", response.data);
      onClose(); // Close the modal after successful save
    } catch (error) {
      console.error("Save error:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Set loading state to false after saving
    }
  };

  // Delete the system prompt
  const handleDelete = async () => {
    setLoading(true); // Set loading state to true while deleting
    try {
      const token = localStorage.getItem("access_token"); // Get the token from local storage

      await axios.delete('http://localhost:8000/business-service/system-prompt', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSystemPrompt(''); // Reset the system prompt state
      onClose(); // Close the modal after successful delete
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false); // Set loading state to false after deletion
    }
  };

  if (!isOpen) return null; // Do not render modal if it's not open

  return (
    <div className="fixed inset-0 bg-black/50 text-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit System Prompt</h2>
        <textarea
  value={systemPrompt || ''} // Ensure the value is never null, defaulting to an empty string
  onChange={(e) => setSystemPrompt(e.target.value)} // Update systemPrompt state on change
          className="w-full h-32 p-2 border rounded-lg"
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
            disabled={loading} // Disable button while loading
          >
            Delete
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose} // Close modal
              className="px-4 py-2 border rounded-xl"
              disabled={loading} // Disable button while loading
            >
              Cancel
            </button>
            <button
              onClick={handleSave} // Save the prompt
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              disabled={loading} // Disable button while loading
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
