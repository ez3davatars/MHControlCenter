import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your MetaHuman assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I understand your message. The MetaHuman is processing your request and will respond accordingly.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
      {/* Chat Messages */}
      <div className="lg:col-span-3 flex flex-col bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Conversation</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                rows={2}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-4">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Voice Controls</h3>
          
          <div className="space-y-3">
            <button
              onClick={toggleSpeaking}
              className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                isSpeaking
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              <span>{isSpeaking ? 'Speaking' : 'Muted'}</span>
            </button>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Voice Speed</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                defaultValue="1"
                className="w-full accent-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Voice Pitch</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                defaultValue="1"
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          
          <div className="space-y-2">
            <button className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Clear Chat
            </button>
            <button className="w-full p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Save Conversation
            </button>
            <button className="w-full p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Load Preset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;