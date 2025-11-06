'use client'

import { useEffect, useState } from 'react'

interface Message {
  id: string
  sender: string
  content: string
  createdAt: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState('Anonymous')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load saved username
    const savedUser = localStorage.getItem('locallens_username')
    if (savedUser) {
      setUser(savedUser)
    }
    
    // Load messages from API
    loadMessages()
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(loadMessages, 3000)
    return () => clearInterval(interval)
  }, [])

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (err) {
      console.error('Failed to load messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: user, content: newMessage.trim() })
      })
      
      if (res.ok) {
        setNewMessage('')
        loadMessages() // Refresh messages
      }
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  const handleUserChange = (newUser: string) => {
    setUser(newUser)
    localStorage.setItem('locallens_username', newUser)
  }

  return (
    <div className="min-h-screen bg-[#f3f1ea] p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">💬 Community Chat</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="h-96 overflow-y-auto mb-4 space-y-3">
            {loading ? (
              <p className="text-center text-gray-500">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt={m.sender}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <strong className="text-blue-600 text-sm">{m.sender}</strong>
                      <span className="text-xs text-gray-400">
                        {new Date(m.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm">{m.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              className="border p-2 rounded w-32"
              placeholder="Your name"
              value={user}
              onChange={(e) => handleUserChange(e.target.value)}
            />
            <input
              className="border p-2 rounded flex-1"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage} 
              disabled={!newMessage.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Messages refresh every 3 seconds • Shared across all users
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
