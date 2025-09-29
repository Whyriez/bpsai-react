import React, { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSendMessage, isLoading, onCancel }) => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      const scrollHeight = Math.min(textarea.scrollHeight, 200); 
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSendMessage(prompt.trim());
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={isLoading ? "AI sedang memproses..." : "Ketik pertanyaan Anda... (Shift+Enter untuk baris baru)"}
              className="w-full px-4 py-3 pr-16 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-bps-blue focus:border-transparent transition-all duration-200 resize-none overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            />
            {/* Tombol di dalam textarea */}
            <div className="absolute bottom-3 right-3 flex items-center">
              {isLoading ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-all duration-200 hover-lift shadow-lg flex items-center justify-center"
                  title="Stop Generating"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                     <rect width="8" height="8" x="6" y="6" rx="1" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="bg-bps-blue hover:bg-blue-800 text-white p-2 rounded-xl transition-all duration-200 hover-lift shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              )}
            </div>
             {/* Sembunyikan scrollbar untuk browser Webkit */}
            <style>
              {`
                textarea::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
          </div>
        </form>
        <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span>💡 Coba tanya: "Pertumbuhan penduduk di Gorontalo"</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;