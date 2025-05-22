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

  // Sendchamp expects recipients as an array
  const recipients = Array.isArray(to) ? to : to.split(",").map((n) => n.trim())

  const payload: any = {
    to: recipients,
    message,
  }
  if (sender_name && sender_name.trim() !== "") {
    payload.sender_name = sender_name.trim()
  }

  const { data } = await axios.post(SENDCHAMP_BASE_URL, payload, {
    headers: {
      "Authorization": `Bearer ${SENDCHAMP_API_KEY}`,
      "Content-Type": "application/json",
    },
  })
  return data
}
