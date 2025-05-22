# Bulk SMS Sender 🚀

A web application for sending bulk SMS messages to multiple recipients using the Termii API. 📲

## Features ✨

- 📤 Send SMS messages to multiple recipients at once
- 📋 Upload recipients from CSV file or paste from clipboard
- 👀 Real-time message preview and character counter
- ✅❌ Detailed success/failure feedback for each recipient
- 📱💻 Responsive design for mobile and desktop

## Tech Stack 🛠️

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes and Server Actions
- **SMS Provider**: Termii API

## Setup Instructions ⚙️

### Prerequisites 📦

- Node.js 18.x or later
- A Termii account

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
   TERMII_API_KEY=your_termii_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser. 🌐

## Environment Variables 🔑

- `TERMII_API_KEY`: Your Termii API key

## CSV Format for Phone Numbers 📑

When importing phone numbers from a CSV file, ensure the file follows these guidelines:
- ☎️ Phone numbers should be in international format (e.g., +2347012345678)
- 📄 Each phone number should be on a new line or separated by commas
- 🚫 No headers are required

Example:
```
+2347012345678
+2348023456789
+2348034567890
```

## License 📃

MIT
