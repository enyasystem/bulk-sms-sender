"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save } from "lucide-react"

// Sample templates - in a real app, these would be stored in a database
const defaultTemplates = [
  {
    id: "1",
    name: "Welcome Message",
    content: "Welcome to our service! We're excited to have you on board. Reply HELP for assistance.",
  },
  {
    id: "2",
    name: "Event Reminder",
    content: "Reminder: Your event is scheduled for tomorrow at 10 AM. We look forward to seeing you!",
  },
  {
    id: "3",
    name: "Appointment Confirmation",
    content: "Your appointment has been confirmed for {date} at {time}. Reply C to confirm or R to reschedule.",
  },
]

interface MessageTemplatesProps {
  onSelectTemplate: (content: string) => void
}

export function MessageTemplates({ onSelectTemplate }: MessageTemplatesProps) {
  const [templates, setTemplates] = useState(defaultTemplates)
  const [newTemplate, setNewTemplate] = useState({ name: "", content: "" })
  const [open, setOpen] = useState(false)

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      onSelectTemplate(template.content)
    }
  }

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const newId = (templates.length + 1).toString()
      setTemplates([...templates, { ...newTemplate, id: newId }])
      setNewTemplate({ name: "", content: "" })
      setOpen(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="template-select">Message Templates</Label>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Save Message Template</DialogTitle>
              <DialogDescription>Create a new template to reuse in future messages.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g., Welcome Message"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Message Content</Label>
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  placeholder="Type your message template here..."
                  className="h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveTemplate} disabled={!newTemplate.name || !newTemplate.content}>
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Select onValueChange={handleSelectTemplate}>
        <SelectTrigger id="template-select">
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
