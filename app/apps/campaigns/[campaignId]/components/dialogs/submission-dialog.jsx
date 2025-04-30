'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from "wagmi";
import { useUser } from "@/hooks/use-user"
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton"


const ConnectDialogContent = ({ isCheckingUser, isConnected, userExists }) => {
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <p className="text-gray-400 mb-2">Please connect your wallet to create a campaign</p>
        <CustomConnectButton />
      </div>
    );
  }

  if (isCheckingUser) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-500 border-t-white"></div>
        <p className="text-gray-400">Checking your account status...</p>
      </div>
    );
  }

  if (userExists === false) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <p className="text-gray-400 mb-2">You need to register before creating campaigns</p>
        <Button 
          onClick={() => router.push('/apps/account/register')}
          variant="outline" 
          className="rounded-full px-8 py-6 bg-black/40 hover:bg-black/60 border-gray-700/40 hover:border-cyan-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)]"
        >
          Register Now
        </Button>
      </div>
    );
  }

  return null;
};


export default function SubmissionDialog() {
  const { address, isConnected, chainId } = useAccount();
  const { userExists, isCheckingUser } = useUser();
  const [isOpen, setIsOpen] = useState(false)
  const [submissionText, setSubmissionText] = useState("")

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log('Submission Text:', submissionText)
    console.log('Submission File:', submissionFile)
    setSubmissionText("")
    setSubmissionFile(null)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full transition-all duration-500">
          Submit Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#060606]/95 border-gray-800/40">
        <DialogHeader>
          <DialogTitle>Submit Your Entry</DialogTitle>
        </DialogHeader>

        {(isCheckingUser || !userExists || !isConnected)
        ? (<ConnectDialogContent isCheckingUser={isCheckingUser} userExists={userExists} isConnected={isConnected} />)
        : (        <div className="py-4">
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea 
              placeholder="Describe your submission..." 
              className="bg-[#0a0a0a] border-gray-800/40 min-h-[120px]"
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full rounded-full"
          >
            Submit Entry
          </Button>
        </div>)
        }
      </DialogContent>
    </Dialog>
  )
}