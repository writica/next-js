'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function SubmissionDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [submissionText, setSubmissionText] = useState("")
  const [submissionFile, setSubmissionFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log('Submission Text:', submissionText)
    console.log('Submission File:', submissionFile)
    setSubmissionText("")
    setSubmissionFile(null)
    setIsOpen(false)
  }

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
        <div className="py-4">
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea 
              placeholder="Describe your submission..." 
              className="bg-[#0a0a0a] border-gray-800/40 min-h-[120px]"
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Upload Files</label>
            <div className="border border-dashed border-gray-800/40 rounded-lg p-8 text-center bg-[#0a0a0a] hover:bg-[#111] transition-colors">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <div className="text-sm text-gray-400">
                  {submissionFile ? (
                    <span>{submissionFile.name}</span>
                  ) : (
                    <>
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            className="w-full rounded-full"
          >
            Submit Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}