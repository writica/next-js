'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { truncateAddress } from '@/lib/utils';
import { useAccount } from 'wagmi';
import {getChainById} from '@/lib/chains';

export function CustomConnectButton() {
  // Using RainbowKit hooks for modal management
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  
  // Get account information with wagmi
  const { address, chainId, connector, isConnected, isConnecting } = useAccount();

  // If still connecting or not mounted, show a disabled connect button
  if (isConnecting) {
    return (
      <Button 
        disabled
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-full px-5 py-2 hover:opacity-90 transition-opacity"
      >
        Connecting...
      </Button>
    );
  }

  // If not connected, show connect button
  if (!isConnected || !address) {
    return (
      <Button 
        onClick={openConnectModal}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-full px-5 py-2 hover:opacity-90 transition-opacity"
      >
        Connect Wallet
      </Button>
    );
  }

  const chain = getChainById(chainId);
  console.log(chain);
  console.log( isConnected);

  if (!chain) {
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
        {chain?.hasIcon && (
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
        {chain?.name}
      </Button>
      
      <Button 
        onClick={openAccountModal} 
        variant="outline" 
        className="flex items-center space-x-2 rounded-full"
      >
        {address && connector?.getAccount?.()?.ensAvatar && (
          <Avatar className="h-5 w-5 rounded-full">
            <img src={connector.getAccount().ensAvatar} alt="ENS Avatar" />
          </Avatar>
        )}
        <span className="text-sm font-medium">
          {address && (connector?.getAccount?.()?.displayName || truncateAddress(address))}
        </span>
        {connector?.getAccount?.()?.displayBalance && (
          <span className="text-sm font-medium text-gray-500">
            {connector.getAccount().displayBalance}
          </span>
        )}
      </Button>
    </div>
  );
}