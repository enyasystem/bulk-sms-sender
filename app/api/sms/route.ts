import { type NextRequest, NextResponse } from "next/server"
import { sendSmsViaTermii } from "@/services/termii"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, recipients, from, media } = body

    // Validate request
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "At least one recipient is required" }, { status: 400 })
    }

    // Send SMS using Termii
    const response = await sendSmsViaTermii({
      to: recipients,
      sms: message,
      from,
      media,
    })

    // Log the response for debugging
    console.log("Termii API response (route):", response)

    // Return the raw response for now
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("Error in SMS API route:", error)
    return NextResponse.json({ error: error.message || "Failed to send SMS" }, { status: 500 })
  }
}
