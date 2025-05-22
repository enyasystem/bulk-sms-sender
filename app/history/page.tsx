import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "SMS History | Bulk SMS Sender",
  description: "View your SMS sending history",
}

// This is a placeholder for the SMS history page
// In a real application, this would fetch data from a database
export default function HistoryPage() {
  // Mock data for demonstration
  const mockHistory = [
    {
      id: "1",
      date: "2023-05-22T10:30:00Z",
      message: "Hello everyone! This is a test message.",
      recipients: 25,
      successful: 23,
      failed: 2,
    },
    {
      id: "2",
      date: "2023-05-21T14:15:00Z",
      message: "Don't forget about our meeting tomorrow at 10 AM.",
      recipients: 12,
      successful: 12,
      failed: 0,
    },
    {
      id: "3",
      date: "2023-05-20T09:45:00Z",
      message: "Your order has been shipped and will arrive in 2-3 business days.",
      recipients: 50,
      successful: 48,
      failed: 2,
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to SMS Sender
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">SMS History</h1>
        <p className="text-muted-foreground mt-2">View your past SMS campaigns</p>
      </div>

      <div className="space-y-4">
        {mockHistory.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">{new Date(item.date).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">{item.message}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Recipients:</span> {item.recipients}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Successful:</span>{" "}
                    <span className="text-green-600">{item.successful}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Failed:</span>{" "}
                    <span className={item.failed > 0 ? "text-red-500" : ""}>{item.failed}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
