"use client";
import { Sparkles, Zap } from "lucide-react";
import Bridge from "./components/Bridge";

/**
 * Home page for the JavaBridge interface with Luwak AI chat
 *
 * @returns {React.ReactNode} The home page
 */
export default function Home() {
  // Ref for the messages container
  // const messagesEndRef = useRef < HTMLDivElement > null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-full max-w-4xl">

        <div className="flex flex-col items-center justify-center w-full ">
          <div className="relative inline-flex items-center gap-3 p-2 px-6 rounded-full bg-gradient-to-r from-java-500 to-java-600 border border-java-700/30 text-java-50 mb-6 shadow-lg shadow-java-500/20 transform hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" color="white" />
            <span className="text-sm font-medium text-white">
            The Fast Lane to Blockchain Transfers ☕
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-java-400 via-java-600 to-java-800 mb-4 drop-shadow-sm">
            <span className="animate-gradient relative text-java-500">
              Java Bridge
              <div className="absolute -top-1 -right-4 w-6 h-6 text-java-400">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
            </span>
          </h1>

          <p className="text-java-700 max-w-xl mx-auto text-lg text-center mb-6 leading-relaxed">
          Delivering <strong>high-speed asset transfers across chains</strong> with seamless interoperability and minimal latency.
          Fast. Secure. Reliable.
          </p>
        </div>

        {/* Chain status indicators */}
        {/* <div className="mb-6 flex justify-center">
          <div className="flex gap-3 p-2 bg-java-900/30 rounded-lg border border-java-800/30">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-java-800/30 to-java-900/30 rounded-md border border-java-700/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-medium text-java-300">Ethereum</span>
              <Gauge className="w-3 h-3 text-java-400/70" />
              <span className="text-xs text-java-400/80">28 Gwei</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-java-800/30 to-java-900/30 rounded-md border border-java-700/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-medium text-java-300">Arbitrum</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-java-800/30 to-java-900/30 rounded-md border border-java-700/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-medium text-java-300">Optimism</span>
            </div>
          </div>
        </div> */}

        {/* Main chat container with coffee-inspired design */}
        <Bridge />
      </div>
    </div>
  );
}

/* Additional animation styles */
const styles = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
}
`;

// Inject the styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
