"use client";

import React from "react";
import { SendHorizonal } from "lucide-react";

export default function ChatInput({ input, setInput, onSendMessage, isThinking }) {
  return (
    <div className="px-4 py-3 bg-gradient-to-b from-java-50/90 to-java-100/90 border-t border-java-200">
      <div className="relative flex items-center">
        <input
          className="flex-1 px-4 py-3 bg-white rounded-l-xl border border-r-0 border-java-200 focus:outline-none focus:ring-2 focus:ring-java-500 focus:border-java-400 placeholder-gray-400 text-gray-900"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          disabled={isThinking}
        />
        <button
          onClick={onSendMessage}
          disabled={!input.trim() || isThinking}
          className={`flex items-center justify-center px-4 py-3 rounded-r-xl border border-java-500 ${
            !input.trim() || isThinking
              ? "bg-java-300 border-java-300 cursor-not-allowed"
              : "bg-java-500 hover:bg-java-600 active:bg-java-700"
          } transition-colors`}
        >
          <SendHorizonal className="h-5 w-5 text-java-50" />
        </button>
      </div>
    </div>
  );
}
