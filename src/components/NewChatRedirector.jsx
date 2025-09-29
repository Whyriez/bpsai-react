import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NewChatRedirector() {
    const navigate = useNavigate();

    useEffect(() => {
        const newConversationId = crypto.randomUUID();
        navigate(`/chat/${newConversationId}`, { replace: true });
    }, [navigate]);
    return <div>Loading new chat...</div>;
}

export default NewChatRedirector;