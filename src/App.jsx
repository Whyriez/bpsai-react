import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewChatRedirector from './components/NewChatRedirector'; 
import ChatPage from './pages/ChatPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<NewChatRedirector />} />
            <Route path="/chat/:conversationId" element={<ChatPage />} />
        </Routes>
    );
}

export default App;