"use server"

import { sendSmsViaTermii } from "@/services/termii"

interface SendSmsParams {
  message: string
  recipients: string[]
}

interface SendSmsResult {
  success: string[]
  failed: { number: string; reason: string }[]
}

export async function sendSms({ message, recipients }: SendSmsParams): Promise<SendSmsResult> {
  // Process recipients in batches to avoid timeouts
  const batchSize = 100
  const result: SendSmsResult = {
    success: [],
    failed: [],
  }

  try {
    // Process in batches
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize)
      try {
        const to = batch.join(",")
        const response = await sendSmsViaTermii({ to, sms: message })
        // Termii returns a status for the whole batch, not per number
        if (response.sms_status === "sent") {
          result.success.push(...batch)
        } else {
          for (const number of batch) {
            result.failed.push({ number, reason: response.message || "Failed to process batch" })
          }
        }
      } catch (error: any) {
        for (const number of batch) {
          result.failed.push({ number, reason: "Failed to process batch" })
        }
      }
    }
    return result
  } catch (error) {
    console.error("Error sending SMS:", error)
    throw new Error("Failed to send SMS messages")
  }
}
