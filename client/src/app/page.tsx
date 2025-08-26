"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    } else {
      // Check system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
  
    setLoading(true);
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
  
    try {
      const api = 'http://localhost:5000'
      const res = await fetch(`${api}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data?.reply ?? "(no reply)";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "bot", text: "Error talking to server." }]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const themeClasses = darkMode 
    ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800" 
    : "bg-gradient-to-br from-slate-50 to-blue-50";

  const cardClasses = darkMode 
    ? "bg-gray-800/80 border-gray-700 shadow-2xl backdrop-blur-sm" 
    : "bg-white/80 border-slate-200 shadow-xl backdrop-blur-sm";

  const textClasses = darkMode ? "text-gray-100" : "text-slate-800";
  const mutedTextClasses = darkMode ? "text-gray-400" : "text-slate-600";
  const inputClasses = darkMode 
    ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-500/20" 
    : "bg-white/90 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-200";

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${themeClasses} py-8`}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className={`text-4xl font-bold ${textClasses} transition-colors duration-300`}>
              Lexora Chatbot
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" 
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="text-3xl mb-4 animate-bounce">🤖</div>
          <p className={`${mutedTextClasses} text-lg transition-colors duration-300`}>
            Intelligent conversations powered by AI 
          </p>
        </div>

        {/* Chat Container */}
        <div className={`${cardClasses} rounded-2xl overflow-hidden transition-all duration-300 animate-slide-up`}>
          {/* Chat Messages */}
          <div className={`h-96 overflow-y-auto p-6 space-y-4 transition-colors duration-300 ${
            darkMode ? "bg-gradient-to-b from-gray-800/50 to-gray-900/50" : "bg-gradient-to-b from-white/50 to-slate-50/50"
          }`}>
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full animate-pulse-gentle">
                <div className="text-center">
                  <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-slate-100'} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110`}>
                    <MessageCircle className={`w-8 h-8 ${mutedTextClasses}`} />
                  </div>
                  <p className={`${mutedTextClasses} text-lg transition-colors duration-300`}>Start the conversation…</p>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-slate-400'} text-sm mt-2 transition-colors duration-300`}>Ask me anything!</p>
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-message-slide-in`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto shadow-lg"
                      : `${darkMode ? 'bg-gray-700/80 border-gray-600 text-gray-100' : 'bg-white/90 border-slate-200 text-slate-800'} border shadow-sm`
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {m.role === "bot" && (
                      <div className={`w-6 h-6 ${darkMode ? 'bg-gray-600' : 'bg-slate-100'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300`}>
                        <span className="text-xs">🤖</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className={`text-xs font-medium mb-1 ${
                        m.role === "user" 
                          ? "text-blue-100" 
                          : darkMode ? "text-gray-400" : "text-slate-500"
                      } transition-colors duration-300`}>
                        {m.role === "user" ? "You" : "Assistant"}
                      </div>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {m.text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-message-slide-in">
                <div className={`${darkMode ? 'bg-gray-700/80 border-gray-600 text-gray-100' : 'bg-white/90 border-slate-200 text-slate-800'} border shadow-sm max-w-xs px-4 py-3 rounded-2xl transition-all duration-300`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${darkMode ? 'bg-gray-600' : 'bg-slate-100'} rounded-full flex items-center justify-center transition-colors duration-300`}>
                      <span className="text-xs">🤖</span>
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-slate-500'} mb-1 transition-colors duration-300`}>Assistant</div>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-slate-400'} rounded-full animate-bounce transition-colors duration-300`}></div>
                          <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-slate-400'} rounded-full animate-bounce transition-colors duration-300`} style={{animationDelay: '0.1s'}}></div>
                          <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-slate-400'} rounded-full animate-bounce transition-colors duration-300`} style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-slate-500'} text-sm ml-2 transition-colors duration-300`}>thinking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-slate-200 bg-slate-50/80'} p-4 transition-all duration-300`}>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={2}
                  placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 resize-none transition-all duration-300 shadow-sm hover:shadow-md ${inputClasses}`}
                  disabled={loading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending
                  </>
                ) : (
                  <>
                    Send
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
            
            <div className={`flex justify-between items-center mt-3 text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'} transition-colors duration-300`}>
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span className="animate-pulse-gentle">{messages.length} messages</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-8 ${darkMode ? 'text-gray-400' : 'text-slate-500'} text-sm transition-colors duration-300 animate-fade-in-delayed`}>
          <p>Powered by Mistral AI • Built with modern web technologies</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes message-slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-message-slide-in {
          animation: message-slide-in 0.5s ease-out;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite;
        }
      `}</style>
    </div>
  );
}