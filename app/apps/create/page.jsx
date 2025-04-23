"use client"
import { useState } from "react"
import { ImageIcon, Upload, Calendar, Users, Info, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import FormInputText from "./components/FormInputText"
import FormFieldInput from "./components/FormFieldInput"
import FormImageUpload from "./components/FormImageUpload"

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
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'coverImage') {
          if (value) {
            formData.append('coverImage', value)
          }
        } else if (value instanceof Date) {
          formData.append(key, JSON.stringify(value))
        } else if (value !== undefined && value !== null) {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
        }
      })

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Campaign created!",
          description: "Your campaign has been created successfully.",
        })
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
    <div className="relative">
      <div className="absolute inset-0 -z-10 dot-pattern"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 gradient-heading">Create a New Campaign</h1>
            <p className="text-gray-400">Set up your campaign and invite writers to contribute</p>
          </div>

          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
              <CardDescription>
                Fill in the details below to create your campaign. Be descriptive to attract writers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
                  >
                    Basic Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="requirements"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
                  >
                    Requirements
                  </TabsTrigger>
                  <TabsTrigger
                    value="media"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
                  >
                    Media
                  </TabsTrigger>
                </TabsList>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <TabsContent value="details" className="space-y-6">

                      <FormFieldInput
                        formControl={form.control}
                        fieldName="title"
                        title="Campaign Title"
                        required={true}
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
                    </TabsContent>

                    <TabsContent value="requirements" className="space-y-6">
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

                    <TabsContent value="media" className="space-y-6">
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
                    </TabsContent>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Create Campaign"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
