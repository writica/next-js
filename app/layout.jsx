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
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 2.828 17.272 15.556l-1.414-1.414L28 2.142 17.414 13.556l-1.414-1.414L28 0h4zM2.828 17.142l1.414 1.414 16.97-16.97L22.626 0h-2.83L2.828 16.97V17.143zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343 8.787 54.93 13.857 60H11.03zm32.284 0L49.8 53.515l-1.415-1.414-7.9 7.9h2.83zM16.686 60L10.2 53.515l1.415-1.414 7.9 7.9h-2.83zm20.97 0l9.315-9.314-1.414-1.414L34.828 60h2.83zM22.344 60l-9.314-9.314 1.414-1.414L25.172 60h-2.83zM32 60l12.142-12.142-1.414-1.414L30 57.172 17.272 44.444l-1.414 1.414L28 57.858 17.414 46.444l-1.414 1.414L28 60h4zM2.828 42.858l1.414-1.414 16.97 16.97L22.626 60h-2.83L2.828 43.03v-.17z' fill='rgba(255,215,128,0.03)' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        }}
      >
        <Providers>
          {/* Header with warm wood-like texture and gradient */}
          <header className="sticky top-0 z-40 w-full border-b border-java-800/40 bg-gradient-to-r from-java-900 via-java-800 to-java-900 backdrop-blur supports-[backdrop-filter]:bg-java-900/80 shadow-md">
            <div className="container flex h-20 items-center justify-between py-4">
              <Link href="/">
                <div className="flex items-center gap-1 transition-all duration-300 hover:scale-105">
                  <div className="rounded-full shadow-lg flex items-center justify-center">
                    <img
                      className="h-12 w-12 rounded-full shadow-lg"
                      src="/img/logo.png"
                    />
                  </div>
                  <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-amber-200 to-java-100 text-transparent bg-clip-text">
                    JavaBridge
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex space-x-1">
                <TopLink href="/" text="Home" />
                <TopLink href="/bridge" text="Bridge" />
                <TopLink href="/network" text="Network" />
                {/* <TopLink href="https://java-bridge.gitbook.io/docs" target='_blank' text="Docs" /> */}
                <ConnectButton />
              </div>

              {/* Mobile Menu - Using the client component */}
              <MobileMenu />
            </div>
          </header>
          <main className="flex-grow flex justify-center p-4 bg-background">
            <div className="container py-10 relative">
              <div className="relative z-10">{children}</div>
            </div>
          </main>
          {/* Footer with warm wooden texture */}
          <footer className="border-t border-java-800/40 bg-gradient-to-r from-java-900 via-amber-950 to-java-900">
            <div className="container flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
              <div className="text-xs text-amber-200/80">
                <p className="mt-1">
                  © {new Date().getFullYear()} JavaBridge, Inc.
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
