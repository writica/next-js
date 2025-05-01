'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const SubmissionContext = createContext(null)

export function SubmissionProvider({ campaignId, children }) {
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/campaigns/submission/list?campaignId=${campaignId}`)
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch submissions')
      }
      
      setSubmissions(result.data)
    } catch (err) {
      console.error("Error fetching submissions:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSubmissions = () => {
    fetchSubmissions()
  }

  useEffect(() => {
    if (campaignId) {
      fetchSubmissions()
    }
  }, [campaignId])

  return (
    <SubmissionContext.Provider value={{ 
      submissions, 
      isLoading, 
      error, 
      refreshSubmissions 
    }}>
      {children}
    </SubmissionContext.Provider>
  )
}

export const useSubmissions = () => {
  const context = useContext(SubmissionContext)
  
  if (context === null) {
    throw new Error('useSubmissions must be used within a SubmissionProvider')
  }
  
  return context
}