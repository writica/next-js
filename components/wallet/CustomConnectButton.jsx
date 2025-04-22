'use client';

import { useState, useEffect } from 'react';
import { useAccount, useEnsName, useBalance, useDisconnect, useEnsAvatar } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Wallet, ArrowUpRight, Power, Check, Copy, ExternalLink } from 'lucide-react';
import { NetworkIndicator } from './NetworkIndicator';
import { cn } from '@/lib/utils';

export function CustomConnectButton() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Format address for display (0x1234...5678)
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyToClipboard = async () => {
    if (!address) return;
    
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address', err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('wallet-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isConnected) {
    return (
      <Button
        onClick={() => window.ethereum && window.dispatchEvent(new Event('rk-connect-request'))}
        className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium rounded-lg px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Wallet className="w-5 h-5 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all duration-300"
      >
        <div className="flex items-center">
          <NetworkIndicator />
          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <Avatar className="h-6 w-6 mr-2">
            {ensAvatar ? (
              <img src={ensAvatar} alt={ensName || address} />
            ) : (
              <div className="bg-gradient-to-br from-violet-500 to-indigo-600 h-full w-full flex items-center justify-center text-white text-xs font-bold">
                {address?.slice(2, 4).toUpperCase()}
              </div>
            )}
          </Avatar>
          <span className="font-medium">
            {ensName || formatAddress(address)}
          </span>
        </div>
      </Button>

      {isDropdownOpen && (
        <Card id="wallet-dropdown" className="absolute right-0 mt-2 w-72 p-4 z-50 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-in fade-in-20 slide-in-from-top-5">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Connected Wallet</h3>
              <NetworkIndicator showName />
            </div>

            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                {ensAvatar ? (
                  <img src={ensAvatar} alt={ensName || address} />
                ) : (
                  <div className="bg-gradient-to-br from-violet-500 to-indigo-600 h-full w-full flex items-center justify-center text-white text-sm font-bold">
                    {address?.slice(2, 4).toUpperCase()}
                  </div>
                )}
              </Avatar>
              <div>
                {ensName && <div className="font-medium">{ensName}</div>}
                <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                  {formatAddress(address)}
                  <Tooltip content={isCopied ? "Copied!" : "Copy address"}>
                    <Button
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 ml-1" 
                      onClick={copyToClipboard}
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <div className="text-xs text-slate-500 dark:text-slate-400">Balance</div>
              <div className="font-medium mt-1">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <DropdownItem 
                icon={ExternalLink} 
                label="View on Explorer" 
                onClick={() => {
                  window.open(`https://etherscan.io/address/${address}`, '_blank');
                }}
              />
              
              <DropdownItem 
                icon={Power} 
                label="Disconnect" 
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
                variant="destructive"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function DropdownItem({ icon: Icon, label, onClick, variant = 'default' }) {
  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start text-sm h-9",
        variant === 'destructive' ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : ''
      )}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}