"use client"
import { useState, useEffect } from "react"
import { ImageIcon, Upload, Calendar, Users, Info, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import FormFieldInput from "@/components/FormFieldInput"
import FormImageUpload from "@/components/FormImageUpload"
import { useAccount, useSignMessage } from "wagmi"
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton"
import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation"

const ButtonCreateCampaign = ({ state, setState, isSubmitting }) => {
  if(state === "media") {
    return (<Button 
      type="submit" 
      disabled={isSubmitting} 
      variant="outline"
      className="rounded-full px-8 py-6 bg-black/40 hover:bg-black/60 border-gray-700/40 hover:border-cyan-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)]"
    >
      {isSubmitting ? (
        <>
          <span className="mr-2">Creating...</span>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-white"></div>
        </>
      ) : (
        "Create Campaign"
      )}
    </Button>);
  }
  
  // Determine the next tab based on current state
  const nextTab = state === "details" ? "requirements" : state === "requirements" ? "media" : "media";

  return (<Button 
    type="button" 
    onClick={() => setState(nextTab)} 
    disabled={isSubmitting} 
    variant="outline"
    className="rounded-full px-8 py-6 bg-black/40 hover:bg-black/60 border-gray-700/40 hover:border-cyan-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)]"
  >Next</Button>);

};

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  campaignAddress: z.string().optional(),
  aiDescription: z.string().optional(),
  keywords: z.string().min(3, "Keywords are required"),
  targetAudience: z.string().optional(),
  ctaGoal: z.string().optional(),
  coverImage: z.any().optional()
})

export default function CreateCampaignPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { address, isConnected } = useAccount()
  const { userExists, isCheckingUser } = useUser()
  const router = useRouter()
  const { data: signatureData, error: signError, isLoading: isSignLoading, signMessage } = useSignMessage()

  // Redirect unregistered users to the registration page
  useEffect(() => {
    if (isConnected && !isCheckingUser && userExists === false) {
      toast({
        title: "Registration Required",
        description: "You need to register before creating campaigns.",
        duration: 5000,
      })
      router.push('/apps/account/register')
    }
  }, [isConnected, isCheckingUser, userExists, router])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      aiDescription: "",
      keywords: "",
      targetAudience: "",
      ctaGoal: "",
      coverImage: undefined,
    },
    mode: "onSubmit",
  });


  async function onSubmit(values) {
    if (!isConnected || !address) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet to create a campaign.",
      })
      return
    }
    
    setIsSubmitting(true)
    try {
      // Step 1: Sign the campaign creation message
      const messageToSign = `Create campaign: ${values.title} by wallet: ${address}`
      const signature = await new Promise((resolve, reject) => {
        signMessage({ message: messageToSign }, { 
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error)
        })
      })

      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'coverImage') {
          if (value) {
            formData.append('coverImage', value)
          }
        } else if (key === 'startDate' || key === 'endDate') {
          // Format dates as ISO strings for consistent parsing
          if (value instanceof Date) {
            formData.append(key, value.toISOString())
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
        }
      })

      // Add wallet address and signature to form data
      formData.append('walletAddress', address)
      formData.append('signature', signature)
      formData.append('signedMessage', messageToSign)

      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Campaign created!",
          description: "Your campaign has been created successfully.",
        })
        // Navigate to the campaigns list after successful creation
        router.push('/apps')
      } else {
        throw new Error(data.message || 'Failed to create campaign')
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        variant: "destructive",
        title: "Error creating campaign",
        description: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background with grid pattern and gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
      </div>

      <div className="container px-4 sm:px-6 py-12 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Create a New Campaign
            </h1>
            <p className="text-gray-400">
              Set up your campaign and invite writers to contribute
            </p>
          </div>

          <Card className="bg-black/40 backdrop-blur-lg border-gray-800/40 overflow-hidden rounded-3xl transition-all duration-300 hover:border-gray-700/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Campaign Information</CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details below to create your campaign. Be descriptive to attract writers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <p className="text-gray-400 mb-2">Please connect your wallet to create a campaign</p>
                  <CustomConnectButton />
                </div>
              ) : isCheckingUser ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-500 border-t-white"></div>
                  <p className="text-gray-400">Checking your account status...</p>
                </div>
              ) : userExists === false ? (
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
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#060606]/80 p-1 rounded-full">
                    <TabsTrigger
                      value="details"
                      className="rounded-full data-[state=active]:bg-[#121212] data-[state=active]:text-cyan-400 transition-all duration-300"
                    >
                      Basic Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="requirements"
                      className="rounded-full data-[state=active]:bg-[#121212] data-[state=active]:text-cyan-400 transition-all duration-300"
                    >
                      Requirements
                    </TabsTrigger>
                    <TabsTrigger
                      value="media"
                      className="rounded-full data-[state=active]:bg-[#121212] data-[state=active]:text-cyan-400 transition-all duration-300"
                    >
                      Media
                    </TabsTrigger>
                  </TabsList>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <TabsContent value="details" className="space-y-6 animate-fade-in">
                        <FormFieldInput
                          formControl={form.control}
                          fieldName="title"
                          title="Campaign Title"
                          required={true}
                          placeholder="Enter your campaign title"
                        />

                        <FormFieldInput
                          formControl={form.control}
                          fieldName="description"
                          title="Campaign Description"
                          type="textarea"
                          rows={4}
                          placeholder="Describe what your campaign is about and what kind of articles you're looking for"
                          required={true}
                        />

                        <FormFieldInput
                          formControl={form.control}
                          fieldName="keywords"
                          title="Keywords"
                          placeholder="Enter keywords separated by commas"
                          icon={<Tag className="h-4 w-4" />}
                          description="Keywords help categorize your campaign"
                          required={true}
                        />
                        
                        {signError && (
                          <div className="rounded-lg bg-red-900/20 p-3 border border-red-800/30">
                            <p className="text-sm text-red-400">
                              Error signing message: {signError.message}
                            </p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="requirements" className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormFieldInput
                            formControl={form.control}
                            fieldName="startDate"
                            title="Start Date"
                            type="date"
                            icon={<Calendar className="h-4 w-4" />}
                            description="When the campaign starts"
                            required={true}
                          />

                          <FormFieldInput
                            formControl={form.control}
                            fieldName="endDate"
                            title="End Date"
                            type="date"
                            icon={<Calendar className="h-4 w-4" />}
                            description="When the campaign ends"
                            required={true}
                          />
                        </div>

                        <FormFieldInput
                          formControl={form.control}
                          fieldName="targetAudience"
                          title="Target Audience"
                          icon={<Users className="h-4 w-4" />}
                          description="Who this campaign is aimed at"
                          placeholder="Describe your target audience"
                        />

                        <FormFieldInput
                          formControl={form.control}
                          fieldName="ctaGoal"
                          title="Call-to-Action Goal"
                          description="The desired outcome for readers"
                          placeholder="What action should readers take?"
                        />
                        
                        <FormFieldInput
                          formControl={form.control}
                          fieldName="aiDescription"
                          title="AI-Friendly Description"
                          type="textarea"
                          rows={3}
                          description="This description will be used for AI analysis"
                          placeholder="Describe your campaign in a way that can be used for AI analysis"
                        />
                      </TabsContent>

                      <TabsContent value="media" className="space-y-6 animate-fade-in">
                        <FormField
                          control={form.control}
                          name="coverImage"
                          render={({ field }) => (
                            <FormImageUpload
                              title="Campaign Cover Image"
                              description="Upload a cover image for your campaign (recommended size: 1200 × 630 pixels)"
                              field={field}
                            />
                          )}
                        />
                        
                        <div className="pt-2">
                          <div className="flex items-center space-x-2 rounded-lg bg-blue-900/20 p-3 border border-blue-800/30">
                            <div className="flex-shrink-0">
                              <Users className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="text-sm text-blue-300">
                              <strong>Connected Wallet:</strong> {address}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <div className="flex justify-end space-x-4 pt-4">
                        <ButtonCreateCampaign state={activeTab} setState={setActiveTab} isSubmitting={isSubmitting || isSignLoading} />
                      </div>
                    </form>
                  </Form>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
