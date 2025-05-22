import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BarChart3, MessageSquare, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | Bulk SMS Sender",
  description: "SMS sending statistics and analytics",
}

export default function DashboardPage() {
  // Mock data for demonstration
  const stats = {
    totalSent: 1250,
    successRate: 98.5,
    activeRecipients: 450,
    campaigns: 15,
  }

  // Mock data for recent campaigns
  const recentCampaigns = [
    {
      id: "1",
      date: "2023-05-22T10:30:00Z",
      name: "Product Launch Announcement",
      recipients: 250,
      successRate: 99.2,
    },
    {
      id: "2",
      date: "2023-05-21T14:15:00Z",
      name: "Weekly Newsletter",
      recipients: 420,
      successRate: 98.1,
    },
    {
      id: "3",
      date: "2023-05-20T09:45:00Z",
      name: "Flash Sale Notification",
      recipients: 380,
      successRate: 97.6,
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to SMS Sender
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your SMS sending activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Average delivery rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRecipients}</div>
            <p className="text-xs text-muted-foreground">Unique phone numbers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Campaigns</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.campaigns}</div>
            <p className="text-xs text-muted-foreground">Total campaigns sent</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Campaigns</h2>
      <div className="space-y-4">
        {recentCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {new Date(campaign.date).toLocaleDateString()} at {new Date(campaign.date).toLocaleTimeString()}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Recipients:</span> {campaign.recipients}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Success Rate:</span>{" "}
                    <span className={campaign.successRate > 95 ? "text-green-600" : "text-amber-500"}>
                      {campaign.successRate}%
                    </span>
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
