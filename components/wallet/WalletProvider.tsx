'use client';

import { ReactNode } from 'react';
import { CustomConnectButton } from './CustomConnectButton';
import { ConnectingAnimation } from './ConnectingAnimation';

interface WalletProviderProps {
  children?: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <>
      {children}
      <ConnectingAnimation />
    </>
  );
}

// Export all wallet components for easy imports
export { CustomConnectButton } from './CustomConnectButton';
export { NetworkIndicator } from './NetworkIndicator';