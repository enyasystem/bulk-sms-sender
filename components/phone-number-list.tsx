"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PhoneNumberListProps {
  phoneNumbers: string[]
  onRemove: (index: number) => void
}

export default function PhoneNumberList({ phoneNumbers, onRemove }: PhoneNumberListProps) {
  if (phoneNumbers.length === 0) {
    return null
  }

  return (
    <div className="border rounded-md">
      <div className="p-2 border-b bg-muted/50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Phone Numbers ({phoneNumbers.length})</span>
        </div>
      </div>
      <ScrollArea className="h-[200px] p-2">
        <div className="flex flex-wrap gap-2 p-2">
          {phoneNumbers.map((number, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-1">
              {number}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
