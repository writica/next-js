'use client';
import Header from "@/components/Header";
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton";

const AppsLayout = ({ children }) => {
    return (
            <main>
                <Header
                  logo="/your-logo.svg"
                  logoAlt="Your Company"
                  logoHref="/apps"
                  menuItems={[

                  ]}
                  rightItems={[
                    <CustomConnectButton key="connect" />,
                  ]}
                  glassMorphism={true}
                 />
                <div className="min-h-[100vh] bg-[#060606]">
                  <div className="py-8">
                    {children}
                  </div>
                </div>
            </main>
    )
};

export default AppsLayout;