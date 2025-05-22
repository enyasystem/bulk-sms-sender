"use server"

import { AfricasTalking } from "@/services/africas-talking"

interface SendSmsParams {
  message: string
  recipients: string[]
}

interface SendSmsResult {
  success: string[]
  failed: { number: string; reason: string }[]
}

export async function sendSms({ message, recipients }: SendSmsParams): Promise<SendSmsResult> {
  const atService = new AfricasTalking()

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
        const response = await atService.sendSms(message, batch)

        // Process response
        if (response.SMSMessageData.Recipients) {
          for (const recipient of response.SMSMessageData.Recipients) {
            if (recipient.status === "Success") {
              result.success.push(recipient.number)
            } else {
              result.failed.push({
                number: recipient.number,
                reason: recipient.status,
              })
            }
          }
        }
      } catch (error) {
        // If a batch fails, mark all numbers in the batch as failed
        for (const number of batch) {
          result.failed.push({
            number,
            reason: "Failed to process batch",
          })
        }
      }
    }

    return result
  } catch (error) {
    console.error("Error sending SMS:", error)
    throw new Error("Failed to send SMS messages")
  }
}
