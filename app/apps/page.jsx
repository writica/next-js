'use client'
import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for campaigns
const campaigns = [
  {
    id: 1,
    title: "Climate Change Awareness",
    description: "Join our campaign to raise awareness about climate change through compelling articles and stories.",
    category: "Environment",
    participants: 24,
    deadline: "Dec 15, 2023",
    image: "/placeholder.svg?height=200&width=400&text=Climate+Change",
    featured: true,
  },
  {
    id: 2,
    title: "Mental Health Matters",
    description: "Share your experiences and insights about mental health to help break the stigma.",
    category: "Health",
    participants: 18,
    deadline: "Nov 30, 2023",
    image: "/placeholder.svg?height=200&width=400&text=Mental+Health",
    featured: false,
  },
  {
    id: 3,
    title: "Digital Privacy",
    description: "Explore the importance of digital privacy in today's connected world.",
    category: "Technology",
    participants: 12,
    deadline: "Dec 5, 2023",
    image: "/placeholder.svg?height=200&width=400&text=Digital+Privacy",
    featured: true,
  },
  {
    id: 4,
    title: "Sustainable Living",
    description: "Share tips and stories about sustainable living practices for a better planet.",
    category: "Lifestyle",
    participants: 31,
    deadline: "Dec 20, 2023",
    image: "/placeholder.svg?height=200&width=400&text=Sustainable+Living",
    featured: false,
  },
  {
    id: 5,
    title: "Future of Work",
    description: "Discuss how work is evolving in the digital age and what it means for the future.",
    category: "Business",
    participants: 15,
    deadline: "Jan 10, 2024",
    image: "/placeholder.svg?height=200&width=400&text=Future+of+Work",
    featured: false,
  },
  {
    id: 6,
    title: "Diversity in Tech",
    description: "Explore the importance of diversity and inclusion in the technology industry.",
    category: "Technology",
    participants: 22,
    deadline: "Dec 25, 2023",
    image: "/placeholder.svg?height=200&width=400&text=Diversity+in+Tech",
    featured: true,
  },
]

const categories = [
  "All",
  "Environment",
  "Health",
  "Technology",
  "Business",
  "Lifestyle",
  "Education",
  "Politics",
  "Culture",
]

export default function CampaignsPage() {
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
              <Input placeholder="Search campaigns..." className="pl-10 bg-gray-950 border-gray-800" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full pt-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-9 h-auto bg-gray-950 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase()}
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-cyan-400"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
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
                      {campaign.featured && (
                        <div className="absolute top-3 right-3 bg-cyan-400/90 text-black text-xs font-medium px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-gray-950/50 text-cyan-400 border-cyan-400/30">
                          {campaign.category}
                        </Badge>
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
                      <Button className="w-full">
                        <Link href={`/campaigns/${campaign.id}`}>Join Campaign</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would be similar but filtered by category */}
            {categories.slice(1).map((category) => (
              <TabsContent key={category} value={category.toLowerCase()} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns
                    .filter((c) => c.category === category)
                    .map((campaign) => (
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
                          {campaign.featured && (
                            <div className="absolute top-3 right-3 bg-cyan-400/90 text-black text-xs font-medium px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Badge variant="outline" className="bg-gray-950/50 text-cyan-400 border-cyan-400/30">
                              {campaign.category}
                            </Badge>
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
