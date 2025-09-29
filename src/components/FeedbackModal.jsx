// src/components/FeedbackModal.jsx
import React, { useState, useEffect } from "react";

function FeedbackModal({ isOpen, onClose, onSubmit, feedbackType }) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      setComment("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
  };
  
  const modalTitle = feedbackType === "positive" ? "Feedback Positif" : "Feedback Negatif";
  const placeholder = feedbackType === "positive" ? "sukai" : "tidak sukai";
  const buttonColor = feedbackType === "positive" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{modalTitle}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Berikan masukan tambahan (opsional)
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-bps-blue focus:ring-2 focus:ring-bps-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={`Apa yang Anda ${placeholder} dari respons ini?`}
            ></textarea>
            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                Batal
              </button>
              <button type="submit" className={`px-4 py-2 text-sm font-medium text-white ${buttonColor} border border-transparent rounded-md shadow-sm`}>
                Kirim Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;