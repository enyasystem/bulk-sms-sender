import { type NextRequest, NextResponse } from "next/server"
import { AfricasTalking } from "@/services/africas-talking"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, recipients } = body

    // Validate request
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "At least one recipient is required" }, { status: 400 })
    }

    // Initialize Africa's Talking service
    const atService = new AfricasTalking()

    // Send SMS
    const response = await atService.sendSms(message, recipients)

    // Process and return results
    const result = {
      success: [],
      failed: [],
    }

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

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in SMS API route:", error)
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
  }
}
