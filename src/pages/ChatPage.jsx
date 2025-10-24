// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";
import FeedbackModal from "../components/FeedbackModal";
import { getHistory, streamChat, submitFeedback } from "../services/chatApi";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const { conversationId } = useParams();

  // State untuk pagination
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    hasMore: false,
    isLoadingMore: false
  });

  // State untuk Thinking Status
  const [thinkingStatus, setThinkingStatus] = useState({ 
    isThinking: false, 
    status: '', 
    detail: '' 
  });

  // State untuk Modal Feedback
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({ messageId: null, type: null });

  // State untuk Notifikasi
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  // Refs untuk mengelola streaming & pembatalan
  const aiResponseAccumulator = useRef("");
  const abortControllerRef = useRef(null);
  
  // Efek untuk mengubah tema (dark mode)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Efek untuk memuat riwayat chat saat conversationId berubah
  useEffect(() => {
    const loadHistory = async () => {
      if (!conversationId) return;
      try {
        const response = await getHistory(conversationId, 1, pagination.perPage);
        const formattedHistory = response.messages.flatMap((item) => [
          { 
            id: `user-${item.prompt_log_id}`, 
            sender: "user", 
            text: item.user_prompt,
            timestamp: Date.now()
          },
          { 
            id: item.prompt_log_id, 
            sender: "ai", 
            text: item.model_response, 
            feedbackGiven: item.has_feedback,
            timestamp: Date.now() + 1
          },
        ]);
        
        setMessages(formattedHistory);
        setPagination(prev => ({
          ...prev,
          page: 1,
          total: response.pagination.total,
          hasMore: response.pagination.has_more
        }));
      } catch (error) {
        console.error("Gagal memuat riwayat:", error);
        setAlert({ show: true, message: "Gagal memuat riwayat chat.", type: "error" });
      }
    };
    loadHistory();
  }, [conversationId]);

  // Fungsi untuk load more messages
  const loadMoreMessages = useCallback(async () => {
    if (pagination.isLoadingMore || !pagination.hasMore) return;
    
    try {
      setPagination(prev => ({ ...prev, isLoadingMore: true }));
      const nextPage = pagination.page + 1;
      const response = await getHistory(conversationId, nextPage, pagination.perPage);
      
      const newMessages = response.messages.flatMap((item) => [
        { 
          id: `user-${item.prompt_log_id}`, 
          sender: "user", 
          text: item.user_prompt,
          timestamp: Date.now() - 10000 // Timestamp lebih lama
        },
        { 
          id: item.prompt_log_id, 
          sender: "ai", 
          text: item.model_response, 
          feedbackGiven: item.has_feedback,
          timestamp: Date.now() - 9000
        },
      ]);

      setMessages(prev => [...newMessages, ...prev]); // Tambah di awal
      setPagination(prev => ({
        ...prev,
        page: nextPage,
        total: response.pagination.total,
        hasMore: response.pagination.has_more,
        isLoadingMore: false
      }));
    } catch (error) {
      console.error("Gagal memuat lebih banyak pesan:", error);
      setPagination(prev => ({ ...prev, isLoadingMore: false }));
    }
  }, [conversationId, pagination]);

  // Efek untuk menampilkan dan menyembunyikan notifikasi
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const updateLastAiMessage = useCallback(() => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.sender === "ai") {
        const updatedMessage = { ...lastMessage, text: aiResponseAccumulator.current };
        return [...prev.slice(0, -1), updatedMessage];
      }
      return prev;
    });
  }, []);

  const handleSendMessage = async (prompt) => {
    if (isLoading) return;

    abortControllerRef.current = new AbortController();
    aiResponseAccumulator.current = "";

    const userMessage = { 
      id: crypto.randomUUID(), 
      text: prompt, 
      sender: "user",
      timestamp: Date.now()
    };
    const aiPlaceholder = { 
      id: crypto.randomUUID(), 
      text: "", 
      sender: "ai",
      timestamp: Date.now() + 1
    };

    setMessages((prev) => [...prev, userMessage, aiPlaceholder]);
    setIsLoading(true);
    setThinkingStatus({ isThinking: true, status: '', detail: '' });

    try {
      await streamChat(
        { prompt, conversation_id: conversationId },
        (chunk) => {
          try {
            const lines = chunk.split('\n');
            lines.forEach(line => {
              if (line.startsWith('data: ')) {
                const jsonStr = line.substring(6);
                if (jsonStr && jsonStr !== '[DONE]') {
                  const data = JSON.parse(jsonStr);
                  
                  // Handle thinking status
                  if (data.thinking === true) {
                    setThinkingStatus({
                      isThinking: true,
                      status: data.status || '',
                      detail: data.detail || ''
                    });
                  } else if (data.thinking === false) {
                    // Thinking selesai, mulai streaming text
                    setThinkingStatus({ isThinking: false, status: '', detail: '' });
                  } else if (data.text) {
                    // Handle text chunks
                    const textChunk = data.text;
                    aiResponseAccumulator.current += textChunk;
                    updateLastAiMessage();
                  }
                }
              }
            });
          } catch (e) {
            console.warn("Error parsing stream chunk:", e);
          }
        },
        (error) => {
          aiResponseAccumulator.current = `Terjadi kesalahan: ${error.message}`;
          updateLastAiMessage();
          setThinkingStatus({ isThinking: false, status: '', detail: '' });
        },
        abortControllerRef.current.signal
      );
    } finally {
      setIsLoading(false);
      setThinkingStatus({ isThinking: false, status: '', detail: '' });
      abortControllerRef.current = null;
    }
  };

  const handleCancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setThinkingStatus({ isThinking: false, status: '', detail: '' });
      // Hapus placeholder AI yang kosong
      setMessages(prev => prev.filter(msg => !(msg.sender === 'ai' && msg.text === '')));
    }
  };
  
  const openFeedbackModal = (messageId, feedbackType) => {
    setCurrentFeedback({ messageId, type: feedbackType });
    setIsFeedbackModalOpen(true);
  };
  
  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };
  
  const handleFeedbackSubmit = async (comment) => {
    const { messageId, type } = currentFeedback;
    if (!messageId || !type) return;

    try {
      await submitFeedback({
        prompt_log_id: messageId,
        type: type,
        comment: comment || null,
        session_id: conversationId,
      });
      setAlert({ show: true, message: "Terima kasih! Feedback Anda telah berhasil dikirim.", type: "success" });
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, feedbackGiven: type } : msg));
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      setAlert({ show: true, message: "Gagal mengirim feedback. Silakan coba lagi.", type: "error" });
    } finally {
      closeFeedbackModal();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors duration-300">
      {alert.show && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} ${alert.show ? 'opacity-100' : 'opacity-0'}`}>
          {alert.message}
        </div>
      )}
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col min-w-0">
          <Header onThemeToggle={handleToggleTheme} theme={theme} />
          <main className="flex-1 flex flex-col overflow-hidden">
            <ChatContainer 
              messages={messages} 
              isLoading={isLoading}
              thinkingStatus={thinkingStatus}
              onFeedback={openFeedbackModal}
              onLoadMore={loadMoreMessages}
              pagination={pagination}
            />
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              onCancel={handleCancelGeneration} 
            />
          </main>
        </div>
      </div>
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={closeFeedbackModal}
        onSubmit={handleFeedbackSubmit}
        feedbackType={currentFeedback.type}
      />
    </div>
  );
}

export default ChatPage;