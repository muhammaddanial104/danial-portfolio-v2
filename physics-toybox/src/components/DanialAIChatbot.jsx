import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowUpRight,
  RotateCcw,
  Minimize2,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "🚀 What are your top skills?",
  "💼 Show me your best projects",
  "💰 How can I hire Danial?",
  "📱 What is your WhatsApp number?",
];

const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: "Hey there! 👋 I'm **DANIAL AI**, Muhammad Danial's personal AI representative.\n\nAsk me anything about Danial's 3D web engineering, AI SaaS projects, experience at ITS Gujrat, or how to hire him!",
  },
];

export default function DanialAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  // Handle message submission
  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput('');
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          query,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "I'm having trouble connecting right now. Feel free to contact Danial directly via WhatsApp: +92 313 7525862!";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: botReply,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content: "Sorry, I ran into a network hiccup! You can reach Danial directly anytime on **WhatsApp: +92 313 7525862** or email **innocentdanial00@gmail.com**.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // Helper to format simple markdown (bold, links, bullet points)
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Bold rendering
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <span key={lineIdx} className="block min-h-[1.2em]">
          {renderedLine}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* First-load speech bubble tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border-brand-purple/40 shadow-glow-sm cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-display text-xs text-brand-lilac">
                Chat with <strong className="text-white">DANIAL AI</strong>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-brand-lavender/60 hover:text-white ml-1 p-0.5"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Bubble */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3.5 rounded-full shadow-glow-lg transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? 'bg-[#18122B] text-brand-lilac border border-brand-purple/50'
              : 'bg-gradient-to-tr from-brand-violet via-brand-purple to-brand-lavender text-white'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open Danial AI Chat'}
        >
          {isOpen ? (
            <Minimize2 className="w-6 h-6 text-brand-lavender" />
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lavender opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#08070D]"></span>
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[calc(100vh-7.5rem)] flex flex-col rounded-2xl glass-panel border border-brand-purple/35 shadow-glass overflow-hidden bg-[#0A0713]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-brand-purple/20 bg-[#130E22]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-violet to-brand-purple flex items-center justify-center text-white font-editorial font-bold shadow-glow-sm">
                    D®
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A0713]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-editorial font-bold text-sm text-white tracking-wide">
                      DANIAL AI
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-lavender fill-brand-purple/30" />
                  </div>
                  <p className="font-mono text-[10px] text-brand-lavender/70 flex items-center gap-1">
                    Creative Dev & AI Representative
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-brand-lavender/60 hover:text-white hover:bg-white/5 transition-colors"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-brand-lavender/60 hover:text-white hover:bg-white/5 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* WhatsApp Quick Banner */}
            <div className="px-3.5 py-1.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-display">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Also available on WhatsApp 24/7
              </div>
              <a
                href="https://wa.me/923137525862"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-emerald-400 hover:text-emerald-200 flex items-center gap-0.5 underline transition-colors"
              >
                +92 313 7525862 <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-display text-sm custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-brand-violet/40 border border-brand-purple/30 flex items-center justify-center shrink-0 mt-0.5 text-brand-lavender">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed text-xs sm:text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-brand-violet to-brand-purple text-white rounded-tr-xs shadow-glow-sm'
                        : 'bg-[#151026]/90 border border-brand-purple/20 text-brand-lilac rounded-tl-xs'
                    }`}
                  >
                    {renderFormattedText(msg.content)}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-brand-purple/30 border border-brand-lavender/30 flex items-center justify-center shrink-0 mt-0.5 text-brand-lilac">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-7 h-7 rounded-full bg-brand-violet/40 border border-brand-purple/30 flex items-center justify-center shrink-0 text-brand-lavender">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#151026]/90 border border-brand-purple/20 px-4 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lavender animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse [animation-delay:200ms]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse [animation-delay:400ms]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Prompts */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/25 text-brand-lavender hover:bg-brand-purple/20 hover:text-white hover:border-brand-purple/50 transition-all text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-brand-purple/20 bg-[#100B1E]/90 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Danial's work or hire him..."
                disabled={isLoading}
                className="flex-1 bg-[#18122B] border border-brand-purple/25 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-brand-lavender/40 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple font-display transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-purple text-white hover:shadow-glow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
