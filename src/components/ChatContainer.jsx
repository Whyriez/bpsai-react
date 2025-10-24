import React, { useEffect, useRef, useState, useCallback } from "react";
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
        Selamat datang di{" "}
        <strong>SIGAP (Sistem Informasi Generatif Asisten Pengetahuan)</strong>{" "}
        BPS Gorontalo! 👋
      </p>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
        Silakan ajukan pertanyaan Anda seputar data statistik Provinsi
        Gorontalo.
      </p>
    </div>
  </div>
);

const ThinkingIndicator = ({ status, detail }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "analyzing":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
      case "history":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "searching":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case "ranking":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        );
      case "building":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        );
      case "generating":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-start space-x-3 message-animation">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-md p-4 shadow-sm border border-gray-100 dark:border-gray-600 max-w-2xl">
        <div className="flex items-center space-x-3">
          <div className="text-blue-500 dark:text-blue-400 animate-pulse">
            {getStatusIcon(status)}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              {detail || "Memproses..."}
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadMoreButton = ({ onLoadMore, isLoading }) => (
  <div className="flex justify-center py-4">
    <button
      onClick={onLoadMore}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? "Memuat..." : "Muat Pesan Sebelumnya"}
    </button>
  </div>
);

const ChatContainer = ({ messages, isLoading, thinkingStatus, onFeedback, onLoadMore, pagination }) => {
  const endOfMessagesRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const lastMessageCountRef = useRef(messages.length);
  const previousScrollHeightRef = useRef(0);
  const userScrolledAwayRef = useRef(false); // Track jika user manual scroll

  // Fungsi untuk scroll ke bawah
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior,
        block: "end",
      });
    }
  }, []);

  // Fungsi untuk cek apakah user di posisi bawah
  const isUserAtBottom = useCallback(() => {
    if (!scrollContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    return scrollBottom < 100; // Threshold 100px dari bawah
  }, []);

  // Handle scroll event - deteksi posisi user
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    
    // Deteksi apakah user di dekat bagian bawah
    const nearBottom = scrollBottom < 100;
    
    // Jika user scroll ke atas (tidak di bawah), tandai sebagai "scrolled away"
    if (!nearBottom) {
      userScrolledAwayRef.current = true;
      setIsAutoScroll(false);
    } else {
      // Jika user kembali ke bawah, reset flag dan aktifkan auto-scroll
      userScrolledAwayRef.current = false;
      setIsAutoScroll(true);
    }
    
    // Load more messages ketika scroll di paling atas
    if (scrollTop === 0 && pagination.hasMore && !pagination.isLoadingMore) {
      onLoadMore();
    }
  }, [pagination.hasMore, pagination.isLoadingMore, onLoadMore]);

  // Effect untuk scroll otomatis saat ada pesan baru atau sedang streaming
  useEffect(() => {
    const hasNewMessage = messages.length > lastMessageCountRef.current;
    const currentScrollHeight = scrollContainerRef.current?.scrollHeight || 0;
    const isLoadingMore = pagination.isLoadingMore;

    // Jika sedang load more (scroll ke atas), pertahankan posisi scroll
    if (isLoadingMore && previousScrollHeightRef.current > 0) {
      const newScrollHeight = currentScrollHeight;
      const scrollDiff = newScrollHeight - previousScrollHeightRef.current;
      if (scrollContainerRef.current && scrollDiff > 0) {
        scrollContainerRef.current.scrollTop = scrollDiff;
      }
    }
    // Auto-scroll ke bawah HANYA jika:
    // 1. Auto-scroll aktif DAN
    // 2. User TIDAK sedang scroll away DAN
    // 3. (Ada pesan baru ATAU sedang streaming/thinking)
    else if (isAutoScroll && !userScrolledAwayRef.current) {
      if (hasNewMessage || isLoading || thinkingStatus.isThinking) {
        scrollToBottom();
      }
    }

    lastMessageCountRef.current = messages.length;
    previousScrollHeightRef.current = currentScrollHeight;
  }, [messages, isLoading, thinkingStatus, isAutoScroll, scrollToBottom, pagination.isLoadingMore]);

  // Effect untuk mengaktifkan kembali auto-scroll saat streaming selesai dan user di bawah
  useEffect(() => {
    if (!isLoading && !thinkingStatus.isThinking) {
      // Reset flag saat streaming selesai
      if (isUserAtBottom()) {
        userScrolledAwayRef.current = false;
        setIsAutoScroll(true);
      }
    }
  }, [isLoading, thinkingStatus.isThinking, isUserAtBottom]);

  // Effect untuk reset flag saat streaming baru dimulai (jika user sudah di bawah)
  useEffect(() => {
    if ((isLoading || thinkingStatus.isThinking) && isUserAtBottom()) {
      // Reset flag jika streaming dimulai dan user sudah di posisi bawah
      userScrolledAwayRef.current = false;
      setIsAutoScroll(true);
      scrollToBottom('smooth');
    }
  }, [isLoading, thinkingStatus.isThinking, scrollToBottom, isUserAtBottom]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto p-4 sm:p-6 chat-scroll"
      style={{ minWidth: 0 }}
      onScroll={handleScroll}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Load More Button */}
        {pagination.hasMore && (
          <LoadMoreButton 
            onLoadMore={onLoadMore} 
            isLoading={pagination.isLoadingMore} 
          />
        )}

        {/* Messages */}
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

        {/* Thinking Indicator */}
        {thinkingStatus.isThinking && (
          <ThinkingIndicator
            status={thinkingStatus.status}
            detail={thinkingStatus.detail}
          />
        )}

        {/* Scroll anchor */}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatContainer;