"use client";
import React, { useState } from "react";
import styles from "./chat.module.scss";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks for your message! 😊" },
      ]);
    }, 600);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatBox}>
        <div className={styles.header}>Chat with Us</div>
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.from === "user" ? styles.userMsg : styles.botMsg}
            >
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
  );
}
