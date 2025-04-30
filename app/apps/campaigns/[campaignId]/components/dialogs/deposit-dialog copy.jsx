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
import { useRewardStatus } from '../providers/reward-status-provider'

export default function DepositDialog({ campaign }) {
  const [isOpen, setIsOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [tokenBalance, setTokenBalance] = useState("0")
  const [isApproving, setIsApproving] = useState(false)
  const [depositHash, setDepositHash] = useState(null)
  
  // Use the shared reward status from the provider
  const { isRewardsDeposited, totalReward } = useRewardStatus()
  
  const { address, chainId } = useAccount()
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Transaction confirmation for the deposit transaction
  const { isSuccess: isDepositConfirmed } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  // Effect to handle successful deposit confirmation
  useEffect(() => {
    if (isDepositConfirmed && depositHash) {
      toast({
        title: "Deposit successful!",
        description: `You have successfully deposited ${depositAmount} $BLOG to the campaign`,
        variant: "success"
      })
      setIsOpen(false)
      setDepositAmount("")
      setDepositHash(null)
    }
  }, [isDepositConfirmed, depositHash, depositAmount])

  const { data: balance } = useReadContract({
    address: contracts[chainId]?.blog?.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  // Update token balance when it changes
  useEffect(() => {
    if (balance) {
      setTokenBalance(formatEther(balance))
    }
  }, [balance])

  const handleMaxAmount = () => {
    setDepositAmount(totalReward)
  }

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive"
      })
      return
    }

    try {
      setIsApproving(true)
      
      // Step 1: Approve token transfer - Use exact amount instead of unlimited approval
      await writeContract({
        address: contracts[chainId].blog.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [campaign.campaignAddress, parseInt(depositAmount) * 10 ** 18],
        // gas: 100000n, // Set reasonable gas limit to avoid high fees
      })
      
      // Wait for approval confirmation
      toast({
        title: "Approval confirmed",
        description: "Now depositing tokens into campaign...",
      })
      
      setIsApproving(false)
      
      // Step 2: Deposit tokens to contract
      const result = await writeContract({
        address: campaign.campaignAddress,
        abi: Campaign,
        functionName: 'depositReward',
      })
      
      // Store the deposit transaction hash for confirmation tracking
      setDepositHash(result)
      
      toast({
        title: "Transaction submitted",
        description: "Waiting for blockchain confirmation...",
      })
    } catch (error) {
      console.error('Failed to deposit:', error)
      toast({
        title: "Deposit failed",
        description: error.message || "An error occurred during deposit",
        variant: "destructive"
      })
      setIsApproving(false)
    }
  }

  // Handle dialog open state
  const handleOpenChange = (open) => {
    setIsOpen(open)
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
                  <span className="text-xs text-gray-400">Required: {parseFloat(totalReward).toFixed(4)} $BLOG</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button 
                    type="button"
                    onClick={handleMaxAmount}
                    variant="ghost" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 text-xs text-emerald-400 hover:bg-emerald-600/20"
                  >
                    MAX
                  </Button>
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
              <Button 
                onClick={handleDeposit}
                disabled={isPending || isConfirming || isApproving || !depositAmount || parseFloat(depositAmount) <= 0 || parseFloat(depositAmount) > parseFloat(tokenBalance)}
                className="w-full rounded-full"
              >
                {isApproving ? "Approving..." :
                 isPending ? "Confirming..." : 
                 depositHash && !isDepositConfirmed ? "Waiting for confirmation..." :
                 "Deposit"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}