'use client'
import { useState } from 'react'
import { Coins } from "lucide-react"
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { campaignABI } from '@/lib/abi/Campaign.json'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function DepositDialog({ campaign }) {
  const [isOpen, setIsOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleDeposit = async () => {
    try {
      const result = await writeContract({
        address: campaign?.contractAddress,
        abi: campaignABI,
        functionName: 'depositPrizePool',
        args: [parseEther(depositAmount)],
      })
      setIsOpen(false)
      setDepositAmount("")
    } catch (error) {
      console.error('Failed to deposit:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-emerald-600/40 hover:bg-emerald-600/20 text-emerald-400"
        >
          <Coins className="h-4 w-4 mr-2" />
          Deposit Prize Pool
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#060606]/95 border-gray-800/40">
        <DialogHeader>
          <DialogTitle>Deposit Prize Pool</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Amount ($BLOG)</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>
          <Button 
            onClick={handleDeposit}
            disabled={isPending || isConfirming}
            className="w-full rounded-full"
          >
            {isPending ? "Confirming..." : 
             isConfirming ? "Depositing..." : 
             "Deposit"}
          </Button>
          {isConfirmed && (
            <p className="text-sm text-emerald-400 mt-2">
              Deposit successful!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}