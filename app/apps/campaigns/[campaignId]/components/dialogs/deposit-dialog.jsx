'use client'
import { useState, useEffect } from 'react'
import { Coins } from "lucide-react"
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { erc20Abi } from 'viem'
import Campaign from '@/lib/abi/Campaign.json'
import contracts from '@/lib/contracts'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { useRewardStatus } from '../providers/reward-status-provider';

const InsufficientBalance = () => {
  return (
    <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
      <p className="text-red-400 font-medium">Insufficient $BLOG Balance</p>
      <p className="text-sm text-gray-300 mt-1">
        You don't have enough $BLOG tokens to deposit the required reward amount. 
        Please acquire more tokens before proceeding.
      </p>
    </div>
  );
};

export default function DepositDialog({ campaign }) {
  const [isOpen, setIsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [depositState, setDepositState] = useState("approval");
  const [isApproving, setIsApproving] = useState(false);
  const [depositHash, setDepositHash] = useState(null);
  const [buttonText, setButtonText] = useState("Approve");
  
  // Use the shared reward status from the provider
  const { isRewardsDeposited, totalReward, updateRewardStatus } = useRewardStatus()
  
  const { address, chainId } = useAccount()
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: balance } = useReadContract({
    address: contracts[chainId]?.blog?.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  // Update token balance when it changes
  useEffect(() => {
    if (balance && balance !== undefined && balance !== tokenBalance) {
      setTokenBalance(formatEther(balance))
    }
  }, [balance]);


  const handleApproval = async () => {
    setIsApproving(true);
    await writeContract({
      address: contracts[chainId].blog.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [campaign.campaignAddress, parseInt(depositAmount) * 10 ** 18],
      // gas: 100000n, // Set reasonable gas limit to avoid high fees
    });
  };

  useEffect(() => {
    if(isConfirmed && hash && depositState === "approval") {
      setIsApproving(false);
      setDepositState("deposit");
      setButtonText("Deposit");
    };
    if(isConfirmed && hash && depositState === "deposit") {
      setDepositHash(hash);
      setDepositState("finish");
      toast({
        title: "Deposit successful!",
        description: `You have successfully deposited ${depositAmount} $BLOG to the campaign, Transaction: ${hash}`,
        variant: "success"
      })
      updateRewardStatus();
    }
    
    console.log("isLoading", isLoading);
    console.log("isConfirmed", isConfirmed);
  },[isLoading, isConfirmed]);

  const handleDeposit = async () => {
    await writeContract({
      address: campaign.campaignAddress,
      abi: Campaign,
      functionName: 'depositReward',
    });
  }

  // Handle dialog open state
  const handleOpenChange = (open) => {
    setIsOpen(open)
  }

  if(!isRewardsDeposited && totalReward != 0 && depositAmount !== totalReward) {
    setDepositAmount(totalReward);
  }

  if(!isRewardsDeposited && tokenBalance < totalReward) {
    console.log("Insufficient balance")
  } else{
    console.log("Sufficient balance")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          variant="outline"
          className={`rounded-full ${isRewardsDeposited ? 
            'border-green-600/40 hover:bg-green-600/20 text-green-400' : 
            'border-emerald-600/40 hover:bg-emerald-600/20 text-emerald-400'}`}
        >
          <Coins className="h-4 w-4 mr-2" />
          {isRewardsDeposited ? 'Rewards Deposited' : 'Deposit Prize Pool'}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#060606]/95 border-gray-800/40">
        <DialogHeader>
          <DialogTitle>Deposit Prize Pool</DialogTitle>
          <DialogDescription>
            Deposit BLOG tokens to fund the campaign rewards
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isRewardsDeposited ? (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <p className="text-green-400 font-medium">Rewards already deposited!</p>
              <p className="text-sm text-gray-300 mt-1">Total reward: {parseFloat(totalReward).toFixed(4)} $BLOG</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Amount ($BLOG)</label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    disabled={true}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Available: {parseFloat(tokenBalance).toFixed(4)} $BLOG</span>
                  {parseFloat(depositAmount) > 0 && parseFloat(depositAmount) !== parseFloat(totalReward) && (
                    <span className={parseFloat(depositAmount) === parseFloat(totalReward) ? 
                      "text-green-400" : "text-amber-400"}>
                      {parseFloat(depositAmount) < parseFloat(totalReward) ? 
                        `Warning: Less than required amount` : 
                        `Warning: More than required amount`}
                    </span>
                  )}
                </div>
              </div>
              {tokenBalance < totalReward && (<InsufficientBalance />)}

              {(tokenBalance >= totalReward && depositState !== 'finish') && (
                <Button 
                  onClick={() =>{
                    depositState === "approval" ? handleApproval() : handleDeposit()
                  }}
                  disabled={isPending || isLoading || isApproving || !depositAmount || parseFloat(depositAmount) <= 0 || parseFloat(depositAmount) > parseFloat(tokenBalance)}
                  className="w-full rounded-full"
                >
                  {buttonText}
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}