"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Help me create a lead generation playbook",
  "What marketing channels work best for B2B?",
  "Show me automation ideas for nurturing leads",
  "How do I set up a LinkedIn outreach campaign?",
];

// Mock AI responses for demo purposes
const mockResponses: Record<string, string> = {
  default: `I'd be happy to help you with your marketing automation! Here are some things I can assist with:

**Playbook Creation**
- Lead generation workflows
- Customer nurture sequences  
- Competitive research automation
- Operations streamlining

**Strategy & Planning**
- Channel recommendations based on your goals
- Budget allocation suggestions
- Timeline planning for campaigns

What would you like to explore?`,

  lead: `Great question! For lead generation, I recommend starting with these high-impact playbooks:

1. **LinkedIn Lead Mining Engine** - Automatically find and engage potential prospects
2. **Meta Ads Lead Capture** - Run targeted ads with instant lead forms
3. **Content-to-Lead Magnet** - Create resources that convert visitors to leads

Would you like me to help you set up any of these? Just tell me about your target audience and goals!`,

  channels: `Here are the most effective marketing channels for B2B:

| Channel | Best For | Effort |
|---------|----------|--------|
| LinkedIn | Decision makers, B2B | Medium |
| Google Ads | High-intent searches | Medium |
| Meta Ads | Awareness, retargeting | Low |
| Email | Nurture, retention | Low |
| WhatsApp | Personal outreach | High |

The best combo? LinkedIn + Email typically gives the highest ROI for B2B. Want specific playbooks for any of these?`,

  automation: `Here are powerful automation ideas for lead nurturing:

**Email Sequences**
- Welcome series (5-7 emails)
- Re-engagement campaigns
- Webinar follow-ups

**Multi-Channel Flows**
- LinkedIn connection → Email follow-up
- Ad click → Personalized sequence
- Demo request → Sales trigger

**AI-Powered**
- Personalized content at scale
- Behavior-triggered responses
- Predictive lead scoring

Which area interests you most?`,

  linkedin: `For LinkedIn outreach, here's a proven playbook:

**Phase 1: Profile Optimization**
- Professional headshot
- Compelling headline
- Relevant experience

**Phase 2: Connection Strategy**
- Personalized invites (not generic!)
- Target by job title/industry

**Phase 3: Engagement**
- Comment on their posts
- Share valuable content
- Direct message follow-up

Want me to generate a full LinkedIn outreach playbook for you?`,

  general: `I'm here to help you build marketing automation playbooks! Think of me as your automation strategist.

I can:
- 🎯 Recommend the right playbooks for your goals
- 📋 Walk you through setup steps
- 🚀 Suggest automation ideas
- 📊 Analyze what's working

What would you like to build today?`,
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  
  if (lower.includes("lead") || lower.includes("generate") || lower.includes("prospect")) {
    return mockResponses.lead;
  }
  if (lower.includes("channel") || lower.includes("platform") || lower.includes("where") || lower.includes("marketing")) {
    return mockResponses.channels;
  }
  if (lower.includes("automation") || lower.includes("nurture") || lower.includes("sequence") || lower.includes("email")) {
    return mockResponses.automation;
  }
  if (lower.includes("linkedin") || lower.includes("outreach")) {
    return mockResponses.linkedin;
  }
  if (lower.includes("help") || lower.includes("create") || lower.includes("build")) {
    return mockResponses.default;
  }
  
  return mockResponses.general;
}

export function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey! I'm your marketing automation assistant. I can help you build playbooks, suggest channels, and automate your lead generation. What would you like to work on?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(input.trim()),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 800 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Automation Assistant</h1>
            <p className="text-xs text-slate-400">AI Agent • Ready to help</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-emerald-400 to-cyan-500"
                    : "bg-slate-600"
                }`}
              >
                {message.role === "assistant" ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block px-5 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                      : "bg-slate-800/80 border border-slate-700/50 text-slate-100"
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-5 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="mt-8">
            <p className="text-sm text-slate-400 mb-3 text-center">Try asking about:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedPrompts.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-full text-sm text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="mt-6 sticky bottom-4">
          <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-2">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about automation playbooks..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 resize-none outline-none px-3 py-2 max-h-32 min-h-[48px]"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-2">
            AI can make mistakes • Verify important information
          </p>
        </div>
      </div>
    </div>
  );
}
