'use client'
import Link from "next/link"
import { ArrowLeft, Edit, Coins, Users, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRewardStatus } from './providers/reward-status-provider'
import DepositDialog from './dialogs/deposit-dialog'
import SubmissionDialog from './dialogs/submission-dialog'

export default function CampaignHeader({ campaign, isOwner }) {
  const { isRewardsDeposited, totalReward } = useRewardStatus()
  
  return (
    <>
      <div className="h-96 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
        <img
          src={campaign.coverImage || "/placeholder.svg"}
          alt={campaign.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 relative -mt-40 z-20">
        <Card className="bg-[#060606]/90 border-gray-800/40 backdrop-blur-lg shadow-xl">
          <CardContent className="p-8">
            <div className="mb-6 -mt-6">
              <Link 
                href="/apps"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Campaigns
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="rounded-full">
                    {campaign.status}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    Ends: {new Date(campaign.endDate).toLocaleDateString()}
                  </span>
                  {campaign.campaignAddress && (
                    <Badge 
                      variant="outline"
                      className={`rounded-full flex items-center gap-1 ${
                        isRewardsDeposited 
                          ? 'border-green-600/40 bg-green-600/10 text-green-400' 
                          : 'border-amber-600/40 bg-amber-600/10 text-amber-400'
                      }`}
                    >
                      {isRewardsDeposited ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Rewards Funded</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>Awaiting Funding</span>
                        </>
                      )}
                    </Badge>
                  )}
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
                <div className="text-xl font-medium text-emerald-400">
                  {campaign.rewardPool} $BLOG
                </div>
                {!isOwner && <SubmissionDialog />}
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
                    <DepositDialog campaign={campaign} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}