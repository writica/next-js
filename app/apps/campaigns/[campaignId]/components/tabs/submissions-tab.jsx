'use client'
import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSubmissions } from "../providers/submission-provider"

export default function SubmissionsTab({ campaign }) {
  const {      submissions, 
    isLoading, 
    error, 
    refreshSubmissions } = useSubmissions(campaign.id);
  console.log("Submissions:", submissions)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaign.submissions?.map((submission) => (
        <Card key={submission.id} className="bg-[#060606]/60 border-gray-800/40 overflow-hidden">
          {submission.preview && (
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={submission.preview}
                alt={`Submission by ${submission.userName}`}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center">
                  <Users size={14} className="text-emerald-400" />
                </div>
                <span className="font-medium text-gray-200">{submission.userName}</span>
              </div>
              <Badge variant="outline" className="rounded-full">
                {submission.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">{submission.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}