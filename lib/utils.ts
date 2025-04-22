import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNiceNumber = (num: number | string) => {
  if (typeof num === "string") {
    num = parseFloat(num);
  }

  num = num.toFixed(4);

  return num.toString();
};

// Function to check and parse special message format
export const processMessageText = (messageText: string) => {
  // Regular expression to match the specific object format
  const objectRegex =
    /\{\{fromChainId: '(\d+)', toChainId: '(\d+)', amount: '(\d+(?:\.\d+)?)', targetAddress: '([^']*)'\}\}/;

  const match = messageText.match(objectRegex);

  if (match) {
    console.log("Full Match:", match[0]);
    console.log("Match Details:", {
      fromChainId: match[1],
      toChainId: match[2],
      amount: match[3],
      targetAddress: match[4],
    });

    const parsedObject = {
      fromChainId: match[1],
      toChainId: match[2],
      amount: match[3],
      targetAddress: match[4] === "null" ? null : match[4],
    };

    // Save parsedObject to localStorage if available (browser environment check)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("bridging_via_ai", JSON.stringify(parsedObject));
        console.log("Saved to localStorage with key: bridging_via_ai");
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }

    console.log("Parsed Object:", parsedObject);

    // Return the text before the matched object
    return messageText.split(match[0])[0].trim();
  }

  // If not a special format, return the original text
  return messageText;
};
