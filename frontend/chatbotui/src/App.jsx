import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const App = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatActive, setIsChatActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const chatContainerRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Generate conversation id
  useEffect(() => {
    if (!conversationId) {
      setConversationId(Date.now().toString());
    }
  }, [conversationId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") return;

    // Add user message first
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: message },
    ]);

    setLoading(true);

    try {
      // 🔴 MAIN API CALL
      const response = await fetch(`${VITE_BASE_URL}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: data.response || "No response" },
      ]);

      setMessage("");

    } catch (error) {
      console.error("Error:", error);

      // Show error in chat UI
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Backend not responding. Please try again.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 fixed inset-0 flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-zinc-900 rounded-lg shadow-lg p-4 sm:p-6">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-white sm:text-2xl font-semibold">
            AI Chatbot
          </h1>
        </div>

        <div
          ref={chatContainerRef}
          className="overflow-y-auto h-96 space-y-4 mb-4 p-4 border border-zinc-900 rounded-lg"
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs p-3 rounded-lg bg-gray-900 text-white animate-pulse">
                AI is typing...
              </div>
            </div>
          )}
        </div>

        {isChatActive && (
          <form
            onSubmit={sendMessage}
            className="flex flex-col sm:flex-row items-center sm:space-x-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-950 text-white text-sm sm:text-base"
              placeholder="Type your message..."
            />

            <button
              type="submit"
              className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base disabled:opacity-50"
              disabled={loading || !message.trim()}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
