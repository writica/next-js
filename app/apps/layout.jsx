'use client';
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomConnectButton, WalletProvider } from "@/components/wallet/WalletProvider";

const AppsLayout = ({ children }) => {
    return (
        <WalletProvider>
            <main>
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
                    <CustomConnectButton key="connect" />,
                  ]}
                  glassMorphism={true}
                 />
                <div>
                    {children}
                </div>
            </main>
        </WalletProvider>
    )
};

export default AppsLayout;