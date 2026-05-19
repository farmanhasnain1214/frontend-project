import { useState } from 'react'
import './App.css'

const INITIAL_MESSAGES = [
  { id: 1, role: 'bot', text: 'Hi! How can I help you today?' },
  { id: 2, role: 'user', text: 'I need help with my project.' },
  {
    id: 3,
    role: 'bot',
    text: 'Sure — tell me what you are building and I will guide you.',
  },
]

const STATIC_REPLIES = [
  'Thanks for your message! This is a static demo — no API connected.',
  'Got it! All my replies are preset. Hook up a real API when you are ready.',
  'Noted. I am just a UI demo with fixed responses for now.',
]

function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [replyIndex, setReplyIndex] = useState(0)

  const canSend = input.trim().length > 0

  function sendMessage() {
    const text = input.trim()
    if (!text) return

    const botText = STATIC_REPLIES[replyIndex % STATIC_REPLIES.length]

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text },
      { id: Date.now() + 1, role: 'bot', text: botText },
    ])
    setReplyIndex((i) => i + 1)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-app">
      <header className="chat-header">
        <span className="chat-avatar" aria-hidden="true">
          AI
        </span>
        <div>
          <h1>Assistant</h1>
          <p>Online</p>
        </div>
      </header>

      <main className="chat-messages" aria-label="Chat messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`bubble bubble--${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </main>

      <footer className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          aria-label="Message input"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={!canSend}
          aria-label="Send message"
        >
          Send
        </button>
      </footer>
    </div>
  )
}

export default App
