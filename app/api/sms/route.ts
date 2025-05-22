import { type NextRequest, NextResponse } from "next/server"
import { sendSmsViaTermii } from "@/services/termii"

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

    // Send SMS using Termii
    const to = recipients.join(",")
    const termiiResponse = await sendSmsViaTermii({ to, sms: message })
    console.log("Termii API response:", termiiResponse)

    // Process and return results based on Termii's response
    const result = {
      message: termiiResponse.message,
      code: termiiResponse.code,
      sms_status: termiiResponse.sms_status,
      balance: termiiResponse.balance,
      // You can add more fields as needed from the response
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in SMS API route:", error)
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
  }
}
