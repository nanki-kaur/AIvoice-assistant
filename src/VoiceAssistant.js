import React, { useState } from 'react';

// Icons (You can use an icon library like FontAwesome or Material Icons)
const MicIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);

const SendIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const VoiceAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle text input submission
  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'User', text: inputText }]);
      setIsLoading(true);
      setInputText('');

      // Simulate assistant response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'Assistant', text: `This is a response to: "${inputText}"` },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages([...messages, { sender: 'User', text: transcript }]);
        setIsLoading(true);

        // Simulate assistant response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: 'Assistant', text: `This is a response to: "${transcript}"` },
          ]);
          setIsLoading(false);
        }, 1000);
      };
      recognition.start();
    }
  };

  return (
    <div className="App">
      {/* Conversation Window */}
      <div className="conversation-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Assistant is typing...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <button
          className={`voice-input-button ${isListening ? 'active' : ''}`}
          onClick={handleVoiceInput}
        >
          <MicIcon />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your query..."
        />
        <button onClick={handleSend}>
          <SendIcon />
        </button>
      </div>

      {/* Settings */}
      <div className="settings">
        <label>
          Voice:
          <select>
            <option value="default">Default</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Language:
          <select>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
          </select>
        </label>
      </div>

      {/* Feedback Buttons */}
      <div className="feedback">
        <button onClick={() => console.log('Positive feedback')}>👍</button>
        <button onClick={() => console.log('Negative feedback')}>👎</button>
      </div>
    </div>
  );
};

export default VoiceAssistant;