'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { truncateAddress } from '@/lib/utils';

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && 
                        account && 
                        chain && 
                        (!authenticationStatus || 
                          authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button 
                    onClick={openConnectModal}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-full px-5 py-2 hover:opacity-90 transition-opacity"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button 
                    onClick={openChainModal}
                    variant="destructive"
                    className="rounded-full"
                  >
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={openChainModal}
                    variant="outline" 
                    className="flex items-center gap-2 rounded-full"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  
                  <Button 
                    onClick={openAccountModal} 
                    variant="outline" 
                    className="flex items-center space-x-2 rounded-full"
                  >
                    {account.ensAvatar ? (
                      <Avatar className="h-5 w-5 rounded-full">
                        <img src={account.ensAvatar} alt="ENS Avatar" />
                      </Avatar>
                    ) : (
                      <Avatar className="h-5 w-5 rounded-full bg-violet-500" />
                    )}
                    <span className="text-sm font-medium">
                      {account.displayName || truncateAddress(account.address)}
                    </span>
                    {account.displayBalance && (
                      <span className="text-sm font-medium text-gray-500">
                        {account.displayBalance}
                      </span>
                    )}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}