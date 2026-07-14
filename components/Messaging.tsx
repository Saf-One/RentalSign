'use client'

import { useState, useEffect } from 'react'
import { sendMessage, getMessages } from '@/app/actions/message'

export default function Messaging({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<any[]>([])
  const [content, setContent] = useState('')

  useEffect(() => {
    getMessages(conversationId).then(setMessages)
  }, [conversationId])

  const handleSend = async () => {
    if (!content) return
    const newMessage = await sendMessage(conversationId, content)
    setMessages([...messages, newMessage])
    setContent('')
  }

  return (
    <div>
      <div>
        {messages.map((m) => (
          <div key={m.id}>{m.sender.name || 'User'}: {m.content}</div>
        ))}
      </div>
      <input 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}
