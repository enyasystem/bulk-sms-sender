"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function EnvChecker() {
  const [missingVars, setMissingVars] = useState<string[]>([])
  const [checked, setChecked] = useState(false)

  /*
  useEffect(() => {
    const requiredVars = ["NEXT_PUBLIC_AT_USERNAME"]
    const missing = requiredVars.filter((varName) => !process.env[varName])
    setMissingVars(missing)
    setChecked(true)
  }, [])

  if (!checked) return null

  if (missingVars.length === 0) {
    return (
      <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>Environment Variables Loaded</AlertTitle>
        <AlertDescription>
          Your Africa's Talking credentials are properly configured. Username: {process.env.NEXT_PUBLIC_AT_USERNAME}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        <p>The following environment variables are missing:</p>
        <ul className="list-disc pl-5 mt-1">
          {missingVars.map((varName) => (
            <li key={varName}>{varName}</li>
          ))}
        </ul>
        <p className="mt-2">Please check your .env.local file and restart the development server.</p>
      </AlertDescription>
    </Alert>
  )
  */
}
