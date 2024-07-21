"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios'; // Import axios for HTTP requests

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add state for loading indicator
  const [error, setError] = useState(null); // Add state for error handling

  // Function to send message to backend and update chat
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return; // Prevent sending empty messages

    setIsLoading(true); // Show loading indicator
    setError(null); // Clear any previous errors

    try {
      const dialogflowResponse = await axios.post('/api/dialogflow.js', {
        message: newMessage,
      });

      const botMessage = { text: dialogflowResponse.data.reply, sender: 'bot' };
      setMessages([...messages, { text: newMessage, sender: 'user' }, botMessage]);
      setNewMessage(''); // Clear input field
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error al enviar el mensaje');
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // Function to fetch initial messages (optional)
  useEffect(() => {
    // Fetch initial messages from server or API (if needed)
  }, []);

  return (
    <div className={styles.container}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className={styles.messageForm}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.messageInput}
          placeholder="Escribe tu mensaje aquí..."
        />
        <button type="submit" className={styles.sendButton}>Enviar</button>
      </form>

      {isLoading && <div className={styles.loadingIndicator}>Cargando...</div>}
    </div>
  );
}
