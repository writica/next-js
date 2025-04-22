"use client";

import { useState, useEffect } from "react";
import { User, Bot, Coffee } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { processMessageText } from "@/lib/utils";

import { useRouter } from 'next/router'; 

export default function ChatMessage({ text, sender }) {
  const isUser = sender === "user";
  const [countdown, setCountdown] = useState(5);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Process the text before rendering
  const processedText = processMessageText(text);

  // If processedText is null, return null to prevent rendering
  if (processedText === null) {
    return null;
  }

  // Check if text was modified by processing
  useEffect(() => {
    if (processedText !== text) {
      setShouldRedirect(true);
      
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            const localStorageValue = JSON.parse(localStorage.getItem("bridging_via_ai"));

            const filteredParams = Object.entries(localStorageValue)
            .filter(([_, value]) => value !== null)
            .reduce((acc, [key, value]) => {
              acc[key] = value.toString();
              return acc;
            }, {});

            const searchParams = new URLSearchParams(filteredParams);
            window.location.href = `/bridge?${searchParams.toString()}`;
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [processedText, text]);

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 p-1 bg-gradient-to-br from-java-600 to-java-700 rounded-xl h-fit shadow-md shadow-java-600/10">
          <Coffee className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-[85%] ${
          isUser ? "bg-java-600 text-white" : "bg-white border border-java-200"
        } p-3 rounded-xl shadow-sm`}
      >
        {shouldRedirect && (
          <div className="text-red-500 font-medium mb-2">
            You will be redirect in {countdown} seconds
          </div>
        )}
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className="rounded-md overflow-hidden my-2 border border-java-800/10 bg-java-900/5">
                  <div className="bg-java-800/10 text-java-700 text-xs px-3 py-1 flex items-center justify-between">
                    <span>{match[1]}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(children);
                      }}
                      className="text-java-600 hover:text-java-800 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={`${className} px-1 py-0.5 bg-java-100 text-java-800 rounded text-sm`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            a: (props) => (
              <a
                {...props}
                className="text-java-600 underline hover:text-java-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code: (props) => (
              <code
                {...props}
                className="bg-amber-950/50 p-1 rounded text-amber-200 text-sm"
              />
            ),
            ul: (props) => (
              <ul {...props} className="list-disc pl-5 my-3 space-y-1" />
            ),
            ol: (props) => (
              <ol {...props} className="list-decimal pl-5 my-3 space-y-1" />
            ),
          }}
        >
          {processedText}
        </ReactMarkdown>
      </div>

      {isUser && (
        <div className="flex-shrink-0 p-1 bg-gradient-to-br from-java-600 to-java-700 rounded-xl h-fit">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
