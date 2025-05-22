import axios from "axios"

interface SmsResponse {
  SMSMessageData: {
    Message: string
    Recipients: {
      number: string
      status: string
      messageId: string
      cost: string
    }[]
  }
}

export class AfricasTalking {
  private username: string
  private apiKey: string
  private senderId: string
  private baseUrl: string

  constructor() {
    // Get credentials from environment variables
    this.username = process.env.NEXT_PUBLIC_AT_USERNAME || "boosterbase"
    this.apiKey = process.env.AT_API_KEY || ""
    this.senderId = process.env.AT_SENDER_ID || ""

    // Use sandbox URL if in sandbox mode, otherwise use production URL
    this.baseUrl =
      this.username === "sandbox"
        ? "https://api.sandbox.africastalking.com/version1/messaging"
        : "https://api.africastalking.com/version1/messaging"

    if (!this.apiKey) {
      console.warn("Africa's Talking API key is not set. SMS sending will fail.")
    }
  }

  async sendSms(message: string, recipients: string[]): Promise<SmsResponse> {
    try {
      // Format recipients as comma-separated string
      const to = recipients.join(",")

      // Prepare request data
      const data = new URLSearchParams()
      data.append("username", this.username)
      data.append("to", to)
      data.append("message", message)

      if (this.senderId) {
        data.append("from", this.senderId)
      }

      // Send request to Africa's Talking API
      const response = await axios.post(this.baseUrl, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apiKey: this.apiKey,
        },
      })

      return response.data
    } catch (error) {
      console.error("Error sending SMS:", error)
      throw new Error("Failed to send SMS via Africa's Talking API")
    }
  }
}
