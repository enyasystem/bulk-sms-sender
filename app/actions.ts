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
        const response = await sendSmsViaTermii({ to: batch, sms: message })
        // Log the response for debugging
        console.log("Termii batch response (actions):", response)
        if (response.sms_status === "sent" || response.status === "success") {
          result.success.push(...batch)
        } else {
          for (const number of batch) {
            result.failed.push({ number, reason: response.message || response.sms_status || "Failed to process batch" })
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
