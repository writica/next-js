'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAccount } from "wagmi";
import { useUser } from "@/hooks/use-user"
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton"
import { z } from "zod";
import FormFieldInput from "@/components/FormFieldInput";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";

const submissionSchema = z.object({
  link: z
    .string()
    .url("Please enter a valid URL")
    .refine((url) => url.includes("x.com") || url.includes("medium.com"), {
      message: "Link must be from X or Medium",
    }),
});

const ConnectDialogContent = ({ isCheckingUser, isConnected, userExists }) => {
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <p className="text-gray-400 mb-2">Please connect your wallet to create a campaign</p>
        <CustomConnectButton />
      </div>
    );
  }

  if (isCheckingUser) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-500 border-t-white"></div>
        <p className="text-gray-400">Checking your account status...</p>
      </div>
    );
  }

  if (userExists === false) {
    return (
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
    );
  }

  return null;
};

const fetchApi = async (submissionId, link, address) => {
  const response = await fetch("/api/campaigns/submission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ submissionId, link, userWalletAddress: address }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit entry");
  }

  return response.json();
};


export default function SubmissionDialog({campaign}) {
  const { address, isConnected, chainId } = useAccount();
  const { userExists, isCheckingUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const form = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: { link: "" },
    mode: "onSubmit",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try{
      const result = await fetchApi(campaign.id, values.link, address);
      setResult(result);
      console.log(result);

    }catch (error) {
      console.error("Error submitting entry:", error);
      // Handle error (e.g., show a notification)
    }finally{
      setIsLoading(false);
    }
    // setIsOpen(false);
  };

  useEffect(() => {
    console.log("isLoading:", isLoading);
  },[isLoading]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full transition-all duration-500">
          Submit Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#060606]/95 border-gray-800/40">
        <DialogHeader>
          <DialogTitle>Submit Your Entry</DialogTitle>
        </DialogHeader>

        {(isCheckingUser || !userExists || !isConnected) ? (
          <ConnectDialogContent
            isCheckingUser={isCheckingUser}
            userExists={userExists}
            isConnected={isConnected}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="py-4 space-y-4">
              <FormFieldInput
                formControl={form.control}
                fieldName="link"
                title="Link"
                placeholder="Enter a Twitter or Medium link"
                type="url"
                required
                validation={{
                  validate: (value) => {
                    if (!value.includes("twitter.com") && !value.includes("medium.com")) {
                      return "Link must be from Twitter or Medium";
                    }
                    return true;
                  },
                }}
              />
              <Button type="submit" variant="secondary" className="flex items-center space-x-2 rounded-full">
                Submit Entry {isLoading && <span className="loader"></span>}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}