import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Welcome! How can I assist you today?", user: "bot" },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMessages = [...messages, { text: input, user: "user" }];
        
        let botReply = "I'm sorry, I don't understand.";
        
        // Example questions and responses
        if (input.toLowerCase().includes("how to add a property")) {
            botReply = "To add a property, go to the 'Add Property' section and fill out the required fields.";
        } else if (input.toLowerCase().includes("how to view tenants")) {
            botReply = "To view tenants, go to the 'Tenant List' section.";
        } else if (input.toLowerCase().includes("how to upload a document")) {
            botReply = "To upload a document, navigate to the 'Upload Document' section.";
        } else if (input.toLowerCase().includes("how to contact support")) {
            botReply = "You can contact support by emailing support@psrmp.com or calling +1-800-123-456.";
        } else if (input.toLowerCase().includes("how to view owners")) {
            botReply = "To view owners, go to the 'Owner List' section.";
        } else if (input.toLowerCase().includes("how to logout")) {
            botReply = "Click on the 'Logout' button in the top right corner to log out.";
        }
        
        setMessages([...newMessages, { text: botReply, user: "bot" }]);
        setInput('');
    };

    return (
        <div>
            <h2>Chatbot</h2>
            <div className="chat-window">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.user === "bot" ? "bot-message" : "user-message"}>
                        <p><strong>{msg.user === "bot" ? "Bot: " : "You: "}</strong>{msg.text}</p>
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask something..." 
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chatbot;
