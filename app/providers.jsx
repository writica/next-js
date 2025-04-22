"use client";

import React, {useEffect} from "react";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useSwitchChain, useAccount } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import chainList from "@/lib/chains.js";
import { Toaster } from "@/components/ui/toaster";


const config = getDefaultConfig({
  autoConnect: true,
  appName: "JavaBridge",
  projectId: "f5b53943703918e01aac6ea97b51addd",
  chains: chainList,
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const AutoSwitchNetwork = () => {
  // const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const {isConnected, chainId} = useAccount();

  const allChainsIds = chainList.map((chain) => chain.id);

  useEffect(() => {
    if (isConnected) {
      // if chain id not in list allChainsIds then switch to arbitrum sepolia

      if (!allChainsIds.includes(chainId)) {
        console.log(`switching to arbitrum sepolia`);
        switchChain(chainList[0].id); // arbitrum sepolia
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
          >
            <AutoSwitchNetwork />
            {children}
            <Toaster />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
