"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"
import { sendSms } from "@/app/actions"
import PhoneNumberList from "@/components/phone-number-list"
import { Progress } from "@/components/ui/progress"
import { MessageTemplates } from "@/components/message-templates"
import { CountryCodeSelector } from "@/components/country-code-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessagePreview } from "@/components/message-preview"

export default function SmsForm() {
  const [message, setMessage] = useState("")
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
  const [inputPhoneNumber, setInputPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    success: string[]
    failed: { number: string; reason: string }[]
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [countryCode, setCountryCode] = useState("+234")

  const MAX_SMS_LENGTH = 160
  const charactersLeft = MAX_SMS_LENGTH - message.length

  const handleAddPhoneNumber = () => {
    if (!inputPhoneNumber.trim()) {
      setError("Please enter a phone number")
      return
    }

    // Enhanced validation for phone numbers with country code
    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneRegex.test(inputPhoneNumber.trim())) {
      setError("Please enter a valid phone number (10-15 digits, can start with +)")
      return
    }

    // Check if the number has a country code (starts with + or has more than 10 digits)
    const trimmedNumber = inputPhoneNumber.trim()
    if (!trimmedNumber.startsWith("+") && trimmedNumber.length <= 10) {
      setError("Phone number must include country code (e.g., +234XXXXXXXXXX)")
      return
    }

    if (phoneNumbers.includes(trimmedNumber)) {
      setError("This phone number is already in the list")
      return
    }

    setPhoneNumbers([...phoneNumbers, trimmedNumber])
    setInputPhoneNumber("")
    setError(null)
  }

  const handleRemovePhoneNumber = (index: number) => {
    const newPhoneNumbers = [...phoneNumbers]
    newPhoneNumbers.splice(index, 1)
    setPhoneNumbers(newPhoneNumbers)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const numbers = content
        .split(/[\n,;]/)
        .map((num) => num.trim())
        .filter((num) => {
          const phoneRegex = /^\+?[0-9]{10,15}$/
          // Check if it has a country code
          const hasCountryCode = num.startsWith("+") || num.length > 10
          return num && phoneRegex.test(num) && hasCountryCode
        })
        .filter((num) => !phoneNumbers.includes(num))

      if (numbers.length === 0) {
        setError("No valid phone numbers found in the file")
        return
      }

      setPhoneNumbers([...phoneNumbers, ...numbers])
      setError(null)
    }
    reader.readAsText(file)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePasteNumbers = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        const numbers = text
          .split(/[\n,;]/)
          .map((num) => num.trim())
          .filter((num) => {
            const phoneRegex = /^\+?[0-9]{10,15}$/
            // Check if it has a country code
            const hasCountryCode = num.startsWith("+") || num.length > 10
            return num && phoneRegex.test(num) && hasCountryCode
          })
          .filter((num) => !phoneNumbers.includes(num))

        if (numbers.length === 0) {
          setError("No valid phone numbers found in the clipboard")
          return
        }

        setPhoneNumbers([...phoneNumbers, ...numbers])
        setError(null)
      })
      .catch(() => {
        setError("Unable to read from clipboard")
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResults(null)

    if (!message.trim()) {
      setError("Please enter a message")
      return
    }

    if (phoneNumbers.length === 0) {
      setError("Please add at least one recipient")
      return
    }

    if (message.length > MAX_SMS_LENGTH) {
      setError(`Message is too long. Maximum length is ${MAX_SMS_LENGTH} characters.`)
      return
    }

    try {
      setIsLoading(true)
      const result = await sendSms({
        message: message.trim(),
        recipients: phoneNumbers,
      })

      setResults(result)
      if (result.failed.length === 0) {
        setMessage("")
        setPhoneNumbers([])
      }
    } catch (err) {
      setError("Failed to send SMS. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <MessageTemplates onSelectTemplate={(content) => setMessage(content)} />
              <div>
                <Label htmlFor="message">Message Content</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="h-32"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <MessagePreview message={message} className="mt-4" />
                <div
                  className={`text-sm mt-1 flex justify-between ${
                    charactersLeft < 0
                      ? "text-red-500"
                      : charactersLeft < 20
                        ? "text-amber-500"
                        : "text-muted-foreground"
                  }`}
                >
                  <span>
                    {charactersLeft < 0
                      ? `${Math.abs(charactersLeft)} characters over limit`
                      : `${charactersLeft} characters left`}
                  </span>
                  <span>
                    {message.length}/{MAX_SMS_LENGTH}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <CountryCodeSelector onSelect={setCountryCode} defaultCode="+234" />
                  <Input
                    placeholder="Phone number without country code"
                    value={inputPhoneNumber}
                    onChange={(e) => setInputPhoneNumber(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        // Add the country code if the user didn't include it
                        const formattedNumber = inputPhoneNumber.startsWith("+")
                          ? inputPhoneNumber.trim()
                          : `${countryCode}${inputPhoneNumber.trim().replace(/^0+/, "")}`
                        setInputPhoneNumber(formattedNumber)
                        handleAddPhoneNumber()
                      }
                    }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    // Add the country code if the user didn't include it
                    const formattedNumber = inputPhoneNumber.startsWith("+")
                      ? inputPhoneNumber.trim()
                      : `${countryCode}${inputPhoneNumber.trim().replace(/^0+/, "")}`
                    setInputPhoneNumber(formattedNumber)
                    handleAddPhoneNumber()
                  }}
                >
                  Add
                </Button>
              </div>

              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="import">Import CSV</TabsTrigger>
                  <TabsTrigger value="paste">Paste Numbers</TabsTrigger>
                </TabsList>
                <TabsContent value="manual" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Add phone numbers one by one using the input field above.
                  </p>
                </TabsContent>
                <TabsContent value="import" className="pt-4">
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select CSV or TXT File
                    </Button>
                    <input
                      type="file"
                      accept=".csv,.txt"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                    <p className="text-xs text-muted-foreground">
                      File should contain one phone number per line or comma-separated.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="paste" className="pt-4">
                  <div className="space-y-2">
                    <Button type="button" variant="outline" className="w-full" onClick={handlePasteNumbers}>
                      Paste Numbers from Clipboard
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Numbers should be separated by new lines, commas, or semicolons.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {phoneNumbers.length > 0 ? (
                <PhoneNumberList phoneNumbers={phoneNumbers} onRemove={handleRemovePhoneNumber} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recipients added yet</p>
                  <p className="text-sm">Add phone numbers individually or import from a file</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && (
          <Alert variant={results.failed.length === 0 ? "default" : "destructive"} className="bg-muted">
            <div className="w-full">
              {results.success.length > 0 && (
                <div className="flex items-center text-green-600 mb-2">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <span>Successfully sent to {results.success.length} recipient(s)</span>
                </div>
              )}

              {results.failed.length > 0 && (
                <div>
                  <div className="flex items-center text-red-500 mb-2">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Failed to send to {results.failed.length} recipient(s)</span>
                  </div>
                  <ul className="text-sm list-disc pl-5 mt-1">
                    {results.failed.map((fail, index) => (
                      <li key={index}>
                        {fail.number}: {fail.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Alert>
        )}

        <CardFooter className="flex justify-between px-0">
          <div className="text-sm text-muted-foreground">{phoneNumbers.length} recipient(s)</div>
          <Button
            type="submit"
            disabled={isLoading || phoneNumbers.length === 0 || !message.trim() || message.length > MAX_SMS_LENGTH}
            className="w-32"
          >
            {isLoading ? "Sending..." : "Send SMS"}
          </Button>
        </CardFooter>

        {isLoading && (
          <div className="space-y-2">
            <Progress value={45} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">Sending messages, please wait...</p>
          </div>
        )}
      </div>
    </form>
  )
}
