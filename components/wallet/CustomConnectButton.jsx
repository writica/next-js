'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { truncateAddress } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { getChainById } from '@/lib/chains';
import { useDrawer } from '@/hooks/use-drawer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function CustomConnectButton() {
  // Using RainbowKit hooks for modal management
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  // Use our custom hook for drawer
  const { openDrawer } = useDrawer();
  
  // Get account information with wagmi
  const { address, chainId, connector, isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState(null);

  // Check if user exists when wallet address changes
  useEffect(() => {
    async function checkUserExists() {
      if (!address || !isConnected) return;
      
      try {
        setIsCheckingUser(true);
        const response = await fetch(`/api/users?walletAddress=${address}`);
        const data = await response.json();
        
        if (data.success) {
          setUserExists(data.exists);
          
          // If user doesn't exist, redirect to registration
          if (!data.exists) {
            toast({
              title: "Registration Required",
              description: "Please complete your profile to continue.",
              duration: 5000,
            });
            router.push('/apps/account/register');
          }
        } else {
          throw new Error(data.message || 'Failed to check user status');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Couldn't verify your account status. Please try again.",
        });
      } finally {
        setIsCheckingUser(false);
      }
    }

    checkUserExists();
  }, [address, isConnected, router]);

  // If still connecting or not mounted, show a disabled connect button
  if (isConnecting || isCheckingUser) {
    return (
      <Button 
        disabled
        variant="outline" 
        className="flex items-center space-x-2 rounded-full"
      >
        {isConnecting ? 'Connecting...' : 'Checking Account...'}
      </Button>
    );
  }

  // If not connected, show connect button
  if (!isConnected || !address) {
    return (
      <Button 
        onClick={openConnectModal}
        variant="secondary" 
        className="flex items-center space-x-2 rounded-full"
      >
        Connect Wallet
      </Button>
    );
  }

  const chain = getChainById(chainId);

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
        onClick={userExists ? openDrawer : () => router.push('/apps/account/register')}
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