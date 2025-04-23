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

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  deadline: z.string({
    required_error: "Please select a deadline.",
  }),
  maxParticipants: z.string().min(1, {
    message: "Please enter maximum participants.",
  }),
})

export default function CreateCampaignPage() {
  const [activeTab, setActiveTab] = useState("details")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      deadline: "",
      maxParticipants: "10",
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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <TabsContent value="details" className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Campaign Title
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-gray-500" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Choose a compelling title that attracts writers</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter a compelling title"
                                className="bg-gray-950 border-gray-800"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Campaign Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe what your campaign is about and what kind of articles you're looking for"
                                className="bg-gray-950 border-gray-800 min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-cyan-400" />
                              Category
                            </FormLabel>
                            {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-950 border-gray-800">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Environment">Environment</SelectItem>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Health">Health</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                <SelectItem value="Politics">Politics</SelectItem>
                                <SelectItem value="Culture">Culture</SelectItem>
                              </SelectContent>
                            </Select> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="requirements" className="space-y-6">
                      <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-cyan-400" />
                              Submission Deadline
                            </FormLabel>
                            <FormControl>
                              <Input type="date" className="bg-gray-950 border-gray-800" {...field} />
                            </FormControl>
                            <FormDescription>The final date for article submissions</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-cyan-400" />
                              Maximum Participants
                            </FormLabel>
                            <FormControl>
                              <Input type="number" min="1" className="bg-gray-950 border-gray-800" {...field} />
                            </FormControl>
                            <FormDescription>Limit the number of writers who can join</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">Article Requirements</Label>
                        <Card className="bg-gray-950 border-gray-800">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Minimum word count</span>
                              <Input type="number" defaultValue="500" className="w-24 bg-gray-900 border-gray-700" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Maximum word count</span>
                              <Input type="number" defaultValue="2000" className="w-24 bg-gray-900 border-gray-700" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Require featured image</span>
                              <div className="flex h-5 items-center">
                                <input
                                  id="require-image"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-cyan-400"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
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
                      <Button variant="outline" type="button">
                        Save as Draft
                      </Button>
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
