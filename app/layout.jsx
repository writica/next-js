import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({ subsets: ["latin"] });

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Button } from "@/components/ui/button";
import Providers from "./providers";

import Link from "next/link";
import meta from "@/lib/meta";
import { cn } from "@/lib/utils";
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton";

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
        className="bg-background min-h-screen"
      >
        <Providers>
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
              <div className="mr-4 flex">
                <Link href="/" className="font-semibold text-xl">JavaBridge</Link>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <CustomConnectButton />
              </div>
            </div>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
