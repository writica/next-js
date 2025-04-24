"use client";

import React, {useEffect} from "react";

import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useSwitchChain, useAccount } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import chainList from "@/lib/chains.js";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/hooks/use-modal";
import { DrawerProvider } from "@/hooks/use-drawer";
import AccountDrawer from "@/components/wallet/AccountDrawer";

const config = getDefaultConfig({
  autoConnect: true,
  appName: "JavaBridge",
  projectId: "f5b53943703918e01aac6ea97b51addd",
  chains: chainList,
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const AutoSwitchNetwork = () => {
  const { switchChain } = useSwitchChain();
  const {isConnected, chainId} = useAccount();

  const allChainsIds = chainList.map((chain) => chain.id);

  useEffect(() => {
    if (isConnected) {
      if (!allChainsIds.includes(chainId)) {
        console.log(`switching to ${chainList[0].name}`);
        switchChain(chainList[0].id); // pharos
      }
      
    }
  }, [isConnected]);

  return null;
};

/**
 * Providers component to wrap the application with all necessary providers
 * This is where theme providers, auth providers, state providers, etc. can be configured
 *
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The content to be wrapped by providers
 * @returns {React.ReactNode} The providers wrapping the children
 */
export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            initialChain={chainList[0]}
            showRecentTransactions={true}
            theme={darkTheme({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <DrawerProvider>
              <ModalProvider>
                <AutoSwitchNetwork />
                {children}
                <AccountDrawer />
                <Toaster />
              </ModalProvider>
            </DrawerProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
