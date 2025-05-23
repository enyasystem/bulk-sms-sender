// services/termii.ts
// Service for sending SMS using Termii API
import axios from "axios"

const TERMII_API_KEY = process.env.TERMII_API_KEY
const TERMII_BASE_URL = "https://v3.api.termii.com/api/sms/send"

export interface SendSmsParams {
  to: string | string[] // comma-separated phone numbers or array
  sms: string
  from?: string // sender id
  media?: { url: string; caption?: string }
}

export async function sendSmsViaTermii({ to, sms, from, media }: SendSmsParams) {
  if (!TERMII_API_KEY) throw new Error("TERMII_API_KEY is not set in environment variables")

  // Format recipients as comma-separated string (Termii expects this)
  let formattedTo: string
  if (Array.isArray(to)) {
    formattedTo = to
      .map((num) => {
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
        if (/^\+234\d{10}$/.test(num)) {
          return n.slice(1)
        }
        // If starts with +, remove plus
        if (/^\+\d{10,15}$/.test(num)) {
          return n
        }
        // Otherwise, return as is
        return n
      })
      .filter(Boolean)
      .join(",")
  } else {
    let n = to.replace(/\D/g, "")
    if (/^0\d{10}$/.test(n)) {
      formattedTo = "234" + n.slice(1)
    } else if (/^234\d{10}$/.test(n)) {
      formattedTo = n
    } else if (/^\+234\d{10}$/.test(to)) {
      formattedTo = n.slice(1)
    } else if (/^\+\d{10,15}$/.test(to)) {
      formattedTo = n
    } else {
      formattedTo = n
    }
  }

  const payload: any = {
    to: formattedTo,
    from: from || "boosterbase", // use your approved sender ID
    sms,
    type: "plain",
    api_key: TERMII_API_KEY,
    channel: "generic",
  }
  if (media && media.url) {
    payload.media = media
  }

  // Debug: log payload for troubleshooting
  console.log("Termii payload:", payload)

  try {
    const { data } = await axios.post(TERMII_BASE_URL, payload, {
      headers: { "Content-Type": "application/json" },
    })
    // Debug: log full response
    console.log("Termii response:", data)
    return data
  } catch (error: any) {
    if (error.response) {
      // Sync error message with frontend expectations
      const errMsg = error.response.data?.message || "Failed to send SMS"
      console.error("Termii error response:", error.response.data)
      // Return a response object that matches the frontend's expected structure
      return {
        sms_status: "failed",
        message: errMsg,
        code: error.response.data?.code || 500,
        status: error.response.data?.status || "error"
      }
    } else {
      console.error("Termii error:", error)
      throw error
    }
  }
}
