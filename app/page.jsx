"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@components/Header/index.jsx";

export default function Home() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const viewport = messagesEndRef.current.closest(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] bg-gradient-to-b p-4">
      <div className="relative w-full max-w-5xl">
        <Header />
      </div>
    </div>
  );
}
