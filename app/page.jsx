"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@components/Header/index.jsx";
import { Button } from "@/components/ui/button";

export default function Home() {

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
    <>
        <Header
          logo="/your-logo.svg"
          logoAlt="Your Company"
          menuItems={[
            { label: "Home", href: "/" },
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "About", href: "/about" }
          ]}
          rightItems={[
            <Button key="login">Sign In</Button>,
            <Button key="signup" variant="primary">Sign Up</Button>
          ]}
          glassMorphism={true}
         />
    </>
  );
}
