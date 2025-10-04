// src/services/chatApi.js
// const API_BASE_URL = 'https://10.75.0.13';
const API_BASE_URL = 'http://127.0.0.1:5001';

/**
 * Mengambil riwayat percakapan dari server.
 * @param {string} conversationId ID unik percakapan.
 * @returns {Promise<Array>} Array berisi riwayat pesan.
 */
export const getHistory = async (conversationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/history/${conversationId}`);
        if (!response.ok) {
            // Jika respons tidak OK tapi bukan 404, lemparkan error
            if (response.status !== 404) {
                 throw new Error(`Gagal memuat riwayat chat: ${response.statusText}`);
            }
            // Jika 404 (Not Found), kembalikan array kosong karena chat baru
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching history:", error);
        throw error;
    }
};

/**
 * Mengirim prompt dan menerima respons AI secara streaming.
 * @param {object} payload Data yang dikirim (prompt, conversation_id).
 * @param {function} onChunk Callback yang dieksekusi untuk setiap chunk data.
 * @param {function} onError Callback jika terjadi error.
 * @param {AbortSignal} signal Sinyal untuk membatalkan request.
 */
export const streamChat = async (payload, onChunk, onError, signal) => {
    try {
        const response = await fetch(`${API_BASE_URL}/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
            },
            body: JSON.stringify(payload),
            signal,
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            onChunk(chunk);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error("Streaming error:", error);
            onError(error);
        }
    }
};

/**
 * Mengirim feedback pengguna ke server.
 * @param {object} feedbackData Data feedback (prompt_log_id, type, comment, session_id).
 * @returns {Promise<object>} Respons JSON dari server.
 */
export const submitFeedback = async (feedbackData) => {
    const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send feedback' }));
        throw new Error(errorData.error);
    }

    return response.json();
};