'use client';
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton";

const AppsLayout = ({ children }) => {
    return (
            <main>
                <Header
                  logo="/your-logo.svg"
                  logoAlt="Your Company"
                  menuItems={[
                    { label: "Campaign", href: "/" },
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
    )
};

export default AppsLayout;