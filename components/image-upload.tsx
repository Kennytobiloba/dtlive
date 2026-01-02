"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        onChange(result.data.url)
        toast.success('Image uploaded successfully!')
      } else {
        toast.error(result.message || 'Failed to upload image')
        setPreview(value) // Reset preview on error
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
      setPreview(value) // Reset preview on error
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    setPreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUrlChange = (url: string) => {
    onChange(url)
    setPreview(url)
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      {preview && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border bg-muted">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => {
              setPreview('')
              toast.error('Invalid image URL')
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
            disabled={disabled || uploading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Options */}
      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </>
            )}
          </Button>
        </div>

        {/* URL Input */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="Or paste image URL"
              value={value}
              onChange={(e) => handleUrlChange(e.target.value)}
              disabled={disabled || uploading}
            />
          </div>
          {!preview && value && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setPreview(value)}
              disabled={disabled || uploading}
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground">
        Upload an image file (max 5MB) or paste an image URL
      </p>
    </div>
  )
}