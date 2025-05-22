// services/termii.ts
// Service for sending SMS using Termii API
import axios from "axios"

const TERMII_API_KEY = process.env.TERMII_API_KEY
const TERMII_BASE_URL = "https://api.ng.termii.com/api/sms/send"

export interface SendSmsParams {
  to: string // comma-separated phone numbers
  sms: string
  from?: string // optional sender id
}

export async function sendSmsViaTermii({ to, sms, from }: SendSmsParams) {
  if (!TERMII_API_KEY) throw new Error("TERMII_API_KEY is not set in environment variables")

  const payload = {
    to,
    from: from || "TermiiSMS",
    sms,
    type: "plain",
    channel: "generic",
    api_key: TERMII_API_KEY,
  }

  const { data } = await axios.post(TERMII_BASE_URL, payload, {
    headers: { "Content-Type": "application/json" },
  })
  return data
}
