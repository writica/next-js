'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { Users, Calendar, ArrowLeft, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"

export default function CampaignDetailPage({ params }) {
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCampaign() {
      try {
        setLoading(true)
        const response = await fetch(`/api/campaigns/get?id=${params.campaignId}`)
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
  }, [params.campaignId])

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
    <div className="relative min-h-screen">
      {/* Background with grid pattern and gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
      </div>

      <div className="container px-4 sm:px-6 py-12 relative z-10">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-transparent"
          asChild
        >
          <Link href="/apps">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Campaigns
          </Link>
        </Button>

        {/* Campaign Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <div className="relative h-96">
            <Image
              src={campaign.coverImage || "/placeholder.svg"}
              alt={campaign.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center text-cyan-400">
                <Users size={16} className="mr-2" />
                <span>{campaign.participants?.length || 0} writers</span>
              </div>
              <div className="flex items-center text-emerald-400">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              {campaign.title}
            </h1>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-[#060606] border-gray-800/20 hover:border-gray-700 transition-all duration-500">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About this Campaign</h2>
                <p className="text-gray-400 whitespace-pre-wrap">{campaign.description}</p>
                
                {campaign.keywords && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Keywords</h3>
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
            <Card className="bg-[#060606] border-gray-800/20 hover:border-gray-700 transition-all duration-500 sticky top-8">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-1">Reward Pool</h3>
                  <p className="text-3xl font-bold text-emerald-400">{campaign.rewardPool} $BLOG</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-1">Campaign Status</h3>
                  <Badge variant={campaign.status === 'ACTIVE' ? 'success' : 'secondary'} className="rounded-full">
                    {campaign.status}
                  </Badge>
                </div>

                {campaign.targetAudience && (
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-400 mb-1">Target Audience</h3>
                    <p className="text-gray-200">{campaign.targetAudience}</p>
                  </div>
                )}

                <Button 
                  className="w-full rounded-full transition-all duration-500"
                  size="lg"
                >
                  Participate in Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}