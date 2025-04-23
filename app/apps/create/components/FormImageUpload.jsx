'use client';
import { useState, useRef } from "react"
import { ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function FormImageUpload({ 
  title, 
  description, 
  field, 
  required = false,
  accept = "image/*"
}) {
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Update form field value
    field.onChange(file)
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)

    // Clean up old preview URL when component unmounts
    return () => URL.revokeObjectURL(previewUrl)
  }

  // Trigger file input click when clicking the upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer?.files?.[0]
    if (file) {
      // Set file to input element to trigger onChange handler
      if (fileInputRef.current) {
        // Create a DataTransfer object to set files property
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        fileInputRef.current.files = dataTransfer.files
        
        // Manually trigger the onChange handler
        handleFileChange({ target: { files: dataTransfer.files } })
      }
    }
  }

  return (
    <FormItem className="space-y-2">
      <FormLabel className="flex items-center gap-2">
        {title}
        {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${preview ? "border-cyan-400 bg-cyan-400/5" : "border-gray-700 hover:border-cyan-400"}`}
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-h-48 overflow-hidden rounded-md mb-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-sm text-cyan-400 mb-2">Image selected</p>
              <Button 
                variant="outline" 
                size="sm" 
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPreview(null)
                  field.onChange(null)
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
              >
                Change image
              </Button>
            </div>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-gray-500 mb-2" />
              <p className="text-sm text-gray-400 mb-1">Drag and drop an image here, or click to select</p>
              <p className="text-xs text-gray-500 mb-4">Recommended size: 1200 x 630 pixels</p>
              <Button variant="outline" size="sm" type="button">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </>
          )}
          <input 
            ref={fileInputRef}
            type="file" 
            accept={accept}
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}