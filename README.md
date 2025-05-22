# Bulk SMS Sender with Africa's Talking 🚀

A web application for sending bulk SMS messages to multiple recipients using the Africa's Talking API. 📲

## Features ✨

- 📤 Send SMS messages to multiple recipients at once
- 📋 Upload recipients from CSV file or paste from clipboard
- 👀 Real-time message preview and character counter
- ✅❌ Detailed success/failure feedback for each recipient
- 📱💻 Responsive design for mobile and desktop

## Tech Stack 🛠️

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes and Server Actions
- **SMS Provider**: Africa's Talking API

## Setup Instructions ⚙️

### Prerequisites 📦

- Node.js 18.x or later
- An Africa's Talking account (sandbox or live)

### Installation 🏗️

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bulk-sms-sender.git
   cd bulk-sms-sender
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   AT_USERNAME=your_username_here
   AT_API_KEY=your_api_key_here
   AT_SENDER_ID=your_sender_id_here
   ```

   ⚠️ Note: If you're using the sandbox environment, set `AT_USERNAME=sandbox`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser. 🌐

## Environment Variables 🔑

- `AT_USERNAME`: Your Africa's Talking username (use "sandbox" for testing)
- `AT_API_KEY`: Your Africa's Talking API key
- `AT_SENDER_ID`: (Optional) Your registered sender ID or short code

## Switching Between Sandbox and Live Mode 🔄

1. To use sandbox mode:
   - Set `AT_USERNAME=sandbox` in your `.env.local` file
   - Use the sandbox API key from your Africa's Talking account

2. To use live mode:
   - Set `AT_USERNAME=your_actual_username` in your `.env.local` file
   - Use your production API key from your Africa's Talking account

## Getting Africa's Talking API Credentials 🗝️

1. Sign up for an account at [Africa's Talking](https://africastalking.com/)
2. Create a new application in your dashboard
3. Navigate to the SMS section to get your API key
4. For sandbox testing, use the credentials provided in the sandbox environment

## CSV Format for Phone Numbers 📑

When importing phone numbers from a CSV file, ensure the file follows these guidelines:
- ☎️ Phone numbers should be in international format (e.g., +254712345678)
- 📄 Each phone number should be on a new line or separated by commas
- 🚫 No headers are required

Example:
```
+254712345678
+254723456789
+254734567890
```

## License 📃

MIT
