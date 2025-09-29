import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage.jsx";

const WelcomeMessage = () => (
  <div className="flex items-start space-x-3 message-animation">
    <div className="w-10 h-10 bg-gradient-to-br from-bps-blue to-blue-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5z" />
      </svg>
    </div>
    <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-md p-4 shadow-sm border border-gray-100 dark:border-gray-600 max-w-2xl hover-lift">
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
        Selamat datang di <strong>BPS Gorontalo AI Assistant</strong>! 👋
      </p>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
        Saya siap membantu Anda dengan informasi statistik Provinsi Gorontalo.
      </p>
    </div>
  </div>
);

const ChatContainer = ({ messages, isLoading, onFeedback }) => {
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Memberi sedikit delay agar rendering selesai sebelum scroll
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 sm:p-6 chat-scroll"
      style={{ minWidth: 0 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.length === 0 && <WelcomeMessage />}
        {messages.map((msg, index) => {
          const isLastAiMessageLoading =
            isLoading && msg.sender === "ai" && index === messages.length - 1;
          return (
            <ChatMessage
              key={msg.id}
              message={msg}
              isLoading={isLastAiMessageLoading}
              onFeedback={onFeedback}
            />
          );
        })}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
