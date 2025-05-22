import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <header className="border-b sticky top-0 bg-background z-10">
              <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <Link href="/" className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <h1 className="text-xl font-bold">Bulk SMS Sender</h1>
                  </Link>
                  <MainNav />
                </div>
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
