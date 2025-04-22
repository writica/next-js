import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({ subsets: ["latin"] });

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Button } from "@/components/ui/button";
import Providers from "./providers";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import meta from "@/lib/meta";
import MobileMenu from "./components/MobileMenu";
import { cn } from "@/lib/utils";

const TopLink = ({ href, text, target = "_self" }) => {
  return (
    <Link href={href} className="" target={target}>
      <Button
        variant="ghost"
        className="text-java-100 hover:text-java-50 hover:bg-java-800/60"
      >
        {text}
      </Button>
    </Link>
  );
};

export const metadata = meta;
/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn(dmSans.className, "dark")}>
      <body
        className="bg-background flex flex-col min-h-screen antialiased"
      >
        <Providers>
          <main className="flex-grow flex justify-center p-4 bg-background">
            <div className="container py-10 relative">
              <div className="relative z-10">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
