// services/sendchamp.ts
// Service for sending SMS using Sendchamp API
import axios from "axios"

const SENDCHAMP_API_KEY = process.env.SENDCHAMP_API_KEY
const SENDCHAMP_BASE_URL = "https://api.sendchamp.com/api/v1/sms/send"

export interface SendSmsParams {
  to: string // comma-separated phone numbers or array
  message: string
  sender_name?: string // optional sender id
}

export async function sendSmsViaSendchamp({ to, message, sender_name }: SendSmsParams) {
  if (!SENDCHAMP_API_KEY) throw new Error("SENDCHAMP_API_KEY is not set in environment variables")

  // Format all numbers to Sendchamp's required format (no plus sign, just country code)
  const recipients = Array.isArray(to) ? to : to.split(",").map((n) => n.trim())
  const formattedRecipients = recipients.map((num) => {
    // Remove all non-digit characters
    let n = num.replace(/\D/g, "")
    // If starts with 0 and is 11 digits, replace with 234
    if (/^0\d{10}$/.test(n)) {
      return "234" + n.slice(1)
    }
    // If starts with 234 and is 13 digits, return as is
    if (/^234\d{10}$/.test(n)) {
      return n
    }
    // If starts with +234, remove plus
    if (/^234\d{10}$/.test(n)) {
      return n
    }
    // If starts with +, remove plus
    if (/^\+\d{10,15}$/.test(num)) {
      return n
    }
    // Otherwise, return as is
    return n
  }).filter(Boolean)

  if (formattedRecipients.length === 0) {
    throw new Error("No valid phone numbers to send.")
  }

  const payload: any = {
    to: formattedRecipients,
    message,
    sender_name: sender_name && sender_name.trim() !== "" ? sender_name.trim() : "Sendchamp",
    route: "non_dnd"
  }

  // Debug: log payload for troubleshooting
  console.log("Sendchamp payload:", payload)

  try {
    const { data } = await axios.post(SENDCHAMP_BASE_URL, payload, {
      headers: {
        "Authorization": `Bearer ${SENDCHAMP_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
    // Debug: log full response
    console.log("Sendchamp response:", data)
    return data
  } catch (error: any) {
    // Log error details for troubleshooting
    if (error.response) {
      console.error("Sendchamp error response:", error.response.data)
    } else {
      console.error("Sendchamp error:", error)
    }
    throw error
  }
}
