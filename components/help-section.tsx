"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export function HelpSection() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Phone Number Format</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Always include the country code (e.g., +234 for Nigeria)</li>
                <li>Remove any leading zeros from the local number</li>
                <li>Example: Convert 0701234567 to +234701234567</li>
                <li>The country code selector will help format your numbers correctly</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Message Length</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                Standard SMS messages are limited to 160 characters. If your message exceeds this limit, it may be split
                into multiple messages, which could affect delivery and pricing.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Importing Numbers</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                When importing from CSV or TXT files, ensure each number is on a new line or separated by commas. All
                numbers should include country codes for reliable delivery.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Sandbox Mode</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                In sandbox mode, messages aren't actually delivered to recipients. You can view test messages in your
                Africa's Talking dashboard. To send real messages, you need to switch to production mode.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
