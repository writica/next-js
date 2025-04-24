"use client"
import { useState } from "react"
import { UserIcon, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import FormFieldInput from "@/components/FormFieldInput"
import FormImageUpload from "@/components/FormImageUpload"
import { useAccount } from "wagmi"
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton"


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().optional(),
  image: z.any().optional()
})

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { address, isConnected } = useAccount()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      image: undefined,
    },
    mode: "onSubmit",
  });

  async function onSubmit(values) {
    if (!isConnected || !address) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet to register.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'image') {
          if (value) {
            formData.append('image', value)
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
        }
      })

      // Add wallet address to form data
      formData.append('walletAddress', address)

      const response = await fetch('/api/users', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Registration successful!",
          description: "Your account has been created successfully.",
        })
        // Could add redirect here to user dashboard or profile
      } else {
        throw new Error(data.message || 'Failed to register')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      toast({
        variant: "destructive",
        title: "Error registering",
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
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Create Your Account
            </h1>
            <p className="text-gray-400">
              Connect your wallet and complete your profile to get started
            </p>
          </div>

          <Card className="bg-black/40 backdrop-blur-lg border-gray-800/40 overflow-hidden rounded-3xl transition-all duration-300 hover:border-gray-700/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                Fill in your details to complete registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <p className="text-gray-400 mb-2">Please connect your wallet to register</p>
                  <CustomConnectButton />
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6 animate-fade-in">
                      <FormFieldInput
                        formControl={form.control}
                        fieldName="name"
                        title="Full Name"
                        required={true}
                        placeholder="Enter your name"
                        icon={<UserIcon className="h-4 w-4" />}
                      />

                      <FormFieldInput
                        formControl={form.control}
                        fieldName="email"
                        title="Email Address"
                        type="email"
                        placeholder="Enter your email address"
                        icon={<Mail className="h-4 w-4" />}
                        required={true}
                      />

                      <FormFieldInput
                        formControl={form.control}
                        fieldName="bio"
                        title="About You"
                        type="textarea"
                        rows={3}
                        placeholder="Tell us a bit about yourself"
                        icon={<FileText className="h-4 w-4" />}
                      />

                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormImageUpload
                            title="Profile Picture"
                            description="Upload a profile picture (recommended: square, min 500×500 pixels)"
                            field={field}
                          />
                        )}
                      />

                      <div className="pt-2">
                        <div className="flex items-center space-x-2 rounded-lg bg-blue-900/20 p-3 border border-blue-800/30">
                          <div className="flex-shrink-0">
                            <UserIcon className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="text-sm text-blue-300">
                            <strong>Connected Wallet:</strong> {address}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        variant="outline"
                        className="rounded-full px-8 py-6 bg-black/40 hover:bg-black/60 border-gray-700/40 hover:border-cyan-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)]"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Registering...</span>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-white"></div>
                          </>
                        ) : (
                          "Register Account"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}