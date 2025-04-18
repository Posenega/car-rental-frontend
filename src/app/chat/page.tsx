"use client"
import React, { useEffect, useState } from "react"
import styles from "./chat.module.scss"
import { socket } from "@/utils/socket"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  // 🔄 Listen for bot replies
  useEffect(() => {
    socket.on("botReply", (data) => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply },
      ])
    })

    return () => {
      socket.off("botReply")
    }
  }, [])

  // 📤 Send message to backend
  const sendMessage = () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { from: "user", text: input }])
    socket.emit("userMessage", { message: input }) // 🔥 send to backend
    setInput("")
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatBox}>
        <div className={styles.header}>Chat with Us</div>
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.from === "user" ? styles.userMsg : styles.botMsg
              }>
              {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}
