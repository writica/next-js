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
import { WordRotate } from '@/components/magicui/word-rotate';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const LoadingWord = () => {
  return (<>
  <div className='flex items-center justify-center'>
    <WordRotate
    className="text-sm font-bold text-muted-foreground"
    words={[`Connecting to sources...`, "Retrieving latest content...", "AI initiating analysis protocols...", "Analyzing text structure & sentiment...",
      "Scanning for AI generation markers...", 'Verifying content authenticity...', 'Matching content with campaign objectives...', 'Validating topic relevance...',
      'Calculating performance score...', 'Compiling insights & final score...'
    ]}
    duration={1250}
    motionProps={{
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.25, ease: "easeOut" },
    }}
  />
</div>
  </>)
};

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
  const [result, setResult] = useState(false);

  const form = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: { link: "" },
    mode: "onSubmit",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try{
      const res = await fetchApi(campaign.id, values.link, address);
      setResult(res);
      console.log(res);

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
    console.log("result:", result);
  },[isLoading, result]);

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
          <Form {...form} className="block w-full relative">
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
              {/* {(result && (result !== false && result !== null && result !== undefined)) && ( */}
                <Collapsible open={true} className="relative overflow-x-hidden">
                  <CollapsibleTrigger className="text-sm font-bold text-muted-foreground">Result</CollapsibleTrigger>
                  <CollapsibleContent className="text-sm font-bold text-muted-foreground">
                    <div className="w-full !block h-96 overflow-auto">
                    <SyntaxHighlighter language="json" style={atomOneDark}
                    wrapLines={true}
                    >
                      {JSON.stringify({
  "submissionId": "cma3ngp1x0005t4ko9ezxjsdo",
  "link": "https://x.com/YustineMelinda/status/1917365551330124257",
  "result": {
    "AIContent": {
      "score": 40,
      "explanation": "Lacks detailed content; mostly brief, repetitive phrases."
    },
    "score": {
      "virality_score": 40,
      "virality_reason": "The tweet has some emotional appeal due to humor and a relatable fear but lacks trending crypto keywords and a strong hook.",
      "quality_score": 30,
      "quality_reason": "The content is informal, lacks depth and clarity, and does not provide educational or actionable crypto insights.",
      "campaign_fit_score": 10,
      "campaign_fit_reason": "The tweet does not align with the vague campaign description or keywords and does not target the specified audience meaningfully."
    },
    "contentUrl": "https://x.com/YustineMelinda/status/1917365551330124257"
  }
}, null, 2)}
                    </SyntaxHighlighter>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              {/* )} */}
                <Button type="submit" variant="outline"
                  className="rounded-full w-full px-8 py-6 bg-black/40 hover:bg-black/60 border-gray-700/40 hover:border-cyan-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)]"
                  disabled={isLoading || !form.formState.isValid}
                >
                {isLoading ? <LoadingWord /> : "Submit"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}