"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessagePreviewProps {
  message: string
  className?: string
}

export function MessagePreview({ message, className }: MessagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!message.trim()) {
    return null
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(!isOpen)}>
        <Eye className="h-4 w-4 mr-2" />
        {isOpen ? "Hide Preview" : "Show Preview"}
      </Button>

      {isOpen && (
        <Card className="border border-dashed">
          <CardContent className="p-4">
            <div className="max-w-[280px] mx-auto">
              <div className="bg-muted rounded-lg p-3 text-sm">{message}</div>
              <div className="text-xs text-center mt-2 text-muted-foreground">Message Preview</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
