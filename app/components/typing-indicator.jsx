"use client";

import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="bg-gradient-to-br from-[#C77D31] to-[#B06D21] rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0 mt-1 shadow-md">
        <Coffee className="h-5 w-5 text-white" />
      </div>

      <div className="bg-gradient-to-r from-[#9A7259] to-[#8B6548] text-amber-100 p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-md">
        <div className="flex gap-2 items-center h-6">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              delay: 0,
            }}
            className="bg-amber-200/40 h-2.5 w-2.5 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              delay: 0.2,
            }}
            className="bg-amber-200/40 h-2.5 w-2.5 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              delay: 0.4,
            }}
            className="bg-amber-200/40 h-2.5 w-2.5 rounded-full"
          />
          <span className="text-sm ml-2 text-amber-100/80">
            Brewing response...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
