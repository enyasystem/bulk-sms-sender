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

  const payload: any = {
    to,
    sms,
    type: "plain",
    channel: "generic",
    api_key: TERMII_API_KEY,
  }
  // According to Termii docs, 'from' is REQUIRED for the /sms/send endpoint.
  // If not provided, the API will return 'From cannot be blank'.
  // The value must be a registered sender ID or 'Notify' for default sender.
  // See: https://developers.termii.com/messaging-api#send-message

  // If 'from' is not provided, use 'Notify' as the default sender ID.
  if (typeof from === "string" && from.trim() !== "" && from.trim().toLowerCase() !== "undefined" && from.trim().toLowerCase() !== "null") {
    payload.from = from.trim()
  } else {
    payload.from = "Notify" // Termii's default sender for generic channel
  }

  const { data } = await axios.post(TERMII_BASE_URL, payload, {
    headers: { "Content-Type": "application/json" },
  })
  return data
}
