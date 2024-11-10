'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!apiKey.trim()) {
      setError('API Key is required')
      return
    }

    setIsLoading(true)

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // If the API call is successful, you would typically save the API key here
      console.log('API Key saved:', apiKey)
      
      setSuccess('API Key saved successfully')
      setApiKey('')
    } catch (err) {
      setError('Failed to save API Key. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Canvas Key:</CardTitle>
          <CardDescription>Enter the API Key of your Canvas Course</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save API Key'}
            </Button>
            {error && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center mt-2 text-green-600">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span>{success}</span>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}