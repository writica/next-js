'use client';

import { CustomConnectButton } from './CustomConnectButton';
import { ConnectingAnimation } from './ConnectingAnimation';

export function WalletProvider({ children }) {
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