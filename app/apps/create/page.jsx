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

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  campaignAddress: z.string().optional(),
  aiDescription: z.string().optional(),
  keywords: z.string().optional(),
  targetAudience: z.string().optional(),
  ctaGoal: z.string().optional(),
})

export default function CreateCampaignPage() {
  const [activeTab, setActiveTab] = useState("details")

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
    },
  })

  function onSubmit(values) {
    console.log(values)
    toast({
      title: "Campaign created!",
      description: "Your campaign has been created successfully.",
    })
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
                  <form onSubmit={(ev)=>{
                    ev.preventDefault()
                    console.log(form);
                    console.log(onSubmit);
                    form.handleSubmit(onSubmit);
                  }} className="space-y-8">
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
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">Campaign Cover Image</Label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors">
                          <ImageIcon className="h-10 w-10 text-gray-500 mb-2" />
                          <p className="text-sm text-gray-400 mb-1">Drag and drop an image here, or click to select</p>
                          <p className="text-xs text-gray-500">Recommended size: 1200 x 630 pixels</p>
                          <Button variant="outline" size="sm" className="mt-4">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">Campaign Banner (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors">
                          <ImageIcon className="h-10 w-10 text-gray-500 mb-2" />
                          <p className="text-sm text-gray-400 mb-1">
                            Drag and drop a banner image here, or click to select
                          </p>
                          <p className="text-xs text-gray-500">Recommended size: 1920 x 480 pixels</p>
                          <Button variant="outline" size="sm" className="mt-4">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Banner
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <div className="flex justify-end space-x-4 pt-4">
                      {/* <Button variant="outline" type="button">
                        Save as Draft
                      </Button> */}
                      <Button type="submit">Create Campaign</Button>
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
