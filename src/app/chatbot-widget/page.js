'use client'

import { useState } from 'react'

export default function ChatbotWidget() {
  const [userId, setUserId] = useState('')
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          query: query,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'Something went wrong')
      }

      setResponse(data.response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl text-black">
      <h1 className="text-2xl font-bold mb-4">Chatbot Widget Tester</h1>

      <label className="block mb-2 text-sm font-medium text-gray-700">User ID</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user_id (Mongo ObjectId)"
        className="w-full p-2 mb-4 border border-gray-300 rounded-xl"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Your Query</label>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your question to the chatbot"
        rows={4}
        className="w-full p-2 mb-4 border border-gray-300 rounded-xl"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send to Chatbot'}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-xl">
          <strong>Response:</strong> {response}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-xl">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}
