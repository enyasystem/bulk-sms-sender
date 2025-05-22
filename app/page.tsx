import type { Metadata } from "next"
import SmsForm from "@/components/sms-form"
import { HelpSection } from "@/components/help-section"
import { EnvChecker } from "@/components/env-checker"

export const metadata: Metadata = {
  title: "Bulk SMS Sender",
  description: "Send bulk SMS messages using Africa's Talking API",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Bulk SMS Sender</h1>
        <p className="text-muted-foreground mt-2">Send SMS messages to multiple recipients using Africa's Talking</p>
      </div>

      <div className="mb-6">
        <EnvChecker />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <SmsForm />
        </div>
        <div className="md:col-span-1">
          <HelpSection />
        </div>
      </div>
    </main>
  )
}
