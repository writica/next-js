"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Mobile menu link component with larger tap targets
const MobileLink = ({href, text, onClick}) => {
  // Handle click with stopPropagation to prevent parent elements from capturing the click
  const handleClick = (e) => {
    // Small delay to ensure the link navigation happens after the menu close animation
    setTimeout(() => {
      onClick();
    }, 100);
  };

  return (
    <div className="w-full mb-2">
      <Link href={href} className="block w-full" onClick={handleClick}>
        <div 
          className="w-full text-left px-4 py-5 rounded-md text-java-100 hover:text-java-50 hover:bg-java-800/60 transition-colors flex items-center text-lg font-medium"
        >
          {text}
        </div>
      </Link>
    </div>
  );
};

export default function MobileMenu() {
  // State for mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu (e.g., when a link is clicked)
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Visible only on mobile */}
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          onClick={toggleMobileMenu}
          className="p-2 text-java-100 hover:text-java-50 hover:bg-java-800/60"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Menu - Slides in from the right */}
      <div 
        className={`md:hidden fixed top-0 bottom-0 right-0 z-50 w-[85%] max-w-[320px] h-[100vh] bg-gradient-to-b from-java-900 via-java-800 to-java-900 shadow-xl transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: '100vh' }}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-between p-4 border-b border-java-800/40">
            <span className="font-bold text-xl bg-gradient-to-r from-amber-200 to-java-100 text-transparent bg-clip-text">
              Menu
            </span>
            <Button 
              variant="ghost" 
              onClick={closeMobileMenu}
              className="p-2 text-java-100 hover:text-java-50 hover:bg-java-800/60"
            >
              <X size={20} />
            </Button>
          </div>
          
          {/* Nav Links Container - Takes available height with overflow support */}
          <div className="flex-grow overflow-y-auto py-4 px-4">
            <div className="flex flex-col space-y-2">
              <MobileLink href="/" text="Home" onClick={closeMobileMenu} />
              <MobileLink href="/chat" text="Chat" onClick={closeMobileMenu} />
              <MobileLink href="/network" text="Network" onClick={closeMobileMenu} />
              <MobileLink href="#" text="Docs" onClick={closeMobileMenu} />
            </div>
          </div>
          
          <div className="p-4 border-t border-java-800/40 mt-auto">
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay when mobile menu is open - ensure it has a lower z-index than the menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}