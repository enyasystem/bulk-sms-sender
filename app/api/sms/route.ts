import { type NextRequest, NextResponse } from "next/server"
import { sendSmsViaSendchamp } from "@/services/sendchamp"

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

    // Send SMS using Sendchamp
    const response = await sendSmsViaSendchamp({ to: recipients.join(","), message })

    // Process and return results based on Sendchamp's response
    const result = {
      status: response.status,
      message: response.message,
      data: response.data,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in SMS API route:", error)
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
  }
}
