import React from "react";

const Header = ({ onThemeToggle, theme }) => (
  <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BPS</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                  📊 BPS Gorontalo
                </h1>
                <p className="hidden md:block text-sm text-gray-500">
                  Badan Pusat Statistik Indonesia - Provinsi Gorontalo
                </p>
              </div>
            </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === "light" ? (
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM12 2l1.09 2.09L15 3l-1.91 1.09L12 6l-1.09-1.91L9 3l2.09 1.09L12 2zm0 16l1.09 2.09L15 21l-1.91 1.09L12 24l-1.09-1.91L9 21l2.09 1.09L12 18z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  </header>
);

export default Header;
