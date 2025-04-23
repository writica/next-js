'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true)
        const response = await fetch('/api/campaigns/list')
        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch campaigns')
        }
        
        setCampaigns(result.data)
      } catch (err) {
        console.error("Error fetching campaigns:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  // Filter campaigns based on search term
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative min-h-[100vh]">
      <div className="absolute inset-0 -z-10 grid-pattern"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-heading">Discover Campaigns</h1>
            <p className="text-gray-400">Join a campaign and start writing articles that matter</p>
          </div>

          <Button className="mt-4 md:mt-0" asChild>
            <Link href="/apps/create">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Campaign
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 mb-8 mt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-10 bg-gray-950 border-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Error: {error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No campaigns found</p>
              <Button asChild>
                <Link href="/apps/create">
                  Create Your First Campaign
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredCampaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="bg-gray-900/80 backdrop-blur-sm border-gray-800 overflow-hidden card-hover"
                >
                  <div className="relative h-48">
                    <Image
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-400">{campaign.participants} writers</div>
                    </div>
                    <CardTitle className="mt-2 text-xl">{campaign.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-gray-400">
                      Deadline: <span className="text-cyan-400">{campaign.deadline}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/campaigns/${campaign.id}`}>Join Campaign</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
