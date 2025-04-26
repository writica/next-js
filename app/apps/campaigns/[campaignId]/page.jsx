'use client'
import { useState, useEffect, use } from "react"
import Image from "next/image"
import { Users, Calendar, ArrowLeft, Link as LinkIcon, Edit, Coins } from "lucide-react"
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { campaignABI } from '@/lib/abi/Campaign.json'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useAccount } from 'wagmi'
import { useUser } from '@/hooks/use-user'

export default function CampaignDetailPage({ params }) {
  const resolvedParams = use(params)
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [submissionText, setSubmissionText] = useState("")
  const [submissionFile, setSubmissionFile] = useState(null)
  const [depositAmount, setDepositAmount] = useState("")
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [txHash, setTxHash] = useState()

  const { address } = useAccount()
  const { userData } = useUser()

  const isOwner = campaign?.ownerId === userData?.id

  useEffect(() => {
    async function fetchCampaign() {
      try {
        setLoading(true)
        const response = await fetch(`/api/campaigns/get?id=${resolvedParams.campaignId}`)
        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch campaign')
        }
        
        setCampaign(result.data)
      } catch (err) {
        console.error("Error fetching campaign:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [resolvedParams.campaignId])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log('Submission Text:', submissionText)
    console.log('Submission File:', submissionFile)
    setSubmissionText("")
    setSubmissionFile(null)
  }

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
      setTxHash(result)
      setIsDepositModalOpen(false)
      setDepositAmount("")
    } catch (error) {
      console.error('Failed to deposit:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" className="text-emerald-400" />
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-400 mb-6 text-xl">Error: {error || 'Campaign not found'}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="rounded-full hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pt-14 bg-black">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/apps"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Link>
      </div>

      {/* Hero section with image */}
      <div className="h-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
        <Image
          src={campaign.coverImage || "/placeholder.svg"}
          alt={campaign.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Campaign header card */}
      <div className="container mx-auto px-4 relative z-20 -mt-20">
        <Card className="bg-[#060606]/90 border-gray-800/40 backdrop-blur-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="rounded-full">
                    {campaign.status}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    Ends: {new Date(campaign.endDate).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl font-light mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {campaign.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-cyan-400">
                    <Users size={16} className="mr-2" />
                    <span>{campaign.participants?.length || 0} writers</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="text-xl font-medium text-emerald-400">{campaign.rewardPool} $BLOG</div>
                {!isOwner && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-full transition-all duration-500">
                        Submit Entry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#060606]/95 border-gray-800/40">
                      <DialogHeader>
                        <DialogTitle>Submit Your Entry</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea 
                            placeholder="Describe your submission..." 
                            className="bg-[#0a0a0a] border-gray-800/40 min-h-[120px]"
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label className="text-sm font-medium mb-2 block">Upload Files</label>
                          <div className="border border-dashed border-gray-800/40 rounded-lg p-8 text-center bg-[#0a0a0a] hover:bg-[#111] transition-colors">
                            <input
                              type="file"
                              id="fileUpload"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="fileUpload" className="cursor-pointer">
                              <div className="text-sm text-gray-400">
                                {submissionFile ? (
                                  <span>{submissionFile.name}</span>
                                ) : (
                                  <>
                                    <span className="font-medium">Click to upload</span> or drag and drop
                                  </>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleSubmit} 
                          className="w-full rounded-full"
                        >
                          Submit Entry
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {isOwner && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="rounded-full border-gray-800/40 hover:bg-gray-800/20"
                      asChild
                    >
                      <Link href={`/apps/campaigns/${campaign.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Campaign
                      </Link>
                    </Button>
                    <Dialog open={isDepositModalOpen} onOpenChange={setIsDepositModalOpen}>
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
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs section */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-3xl mx-auto mb-8 bg-[#0a0a0a] border-gray-800/40">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="requirements" className="flex-1">Requirements</TabsTrigger>
            <TabsTrigger value="submissions" className="flex-1">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="bg-[#060606]/60 border-gray-800/40 backdrop-blur-lg">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-4">Campaign Description</h2>
                    <p className="text-gray-400 whitespace-pre-wrap">{campaign.description}</p>
                    
                    {campaign.keywords && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                          {campaign.keywords.split(',').map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="rounded-full">
                              {keyword.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-[#060606] border-gray-800/40 sticky top-8">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-sm text-gray-400 mb-1">Target Audience</h3>
                      <p className="text-gray-200">{campaign.targetAudience || 'Not specified'}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm text-gray-400 mb-1">Campaign Status</h3>
                      <Badge variant={campaign.status === 'ACTIVE' ? 'success' : 'secondary'} className="rounded-full">
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm text-gray-400 mb-1">Timeline</h3>
                      <div className="text-gray-200">
                        <div>Start: {new Date(campaign.startDate).toLocaleDateString()}</div>
                        <div>End: {new Date(campaign.endDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="mt-0">
            <Card className="bg-[#060606]/60 border-gray-800/40">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">Submission Requirements</h2>
                <div className="space-y-4 text-gray-400">
                  {campaign.requirements?.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center text-xs font-medium text-emerald-400 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p>{req}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaign.submissions?.map((submission) => (
                <Card key={submission.id} className="bg-[#060606]/60 border-gray-800/40 overflow-hidden">
                  {submission.preview && (
                    <div className="aspect-w-16 aspect-h-9">
                      <Image 
                        src={submission.preview}
                        alt={`Submission by ${submission.userName}`}
                        width={400}
                        height={225}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center">
                          <Users size={14} className="text-emerald-400" />
                        </div>
                        <span className="font-medium text-gray-200">{submission.userName}</span>
                      </div>
                      <Badge variant="outline" className="rounded-full">
                        {submission.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{submission.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}