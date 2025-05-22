"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Common country codes
const countryCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+256", country: "Uganda" },
  { code: "+255", country: "Tanzania" },
  { code: "+233", country: "Ghana" },
  { code: "+27", country: "South Africa" },
  { code: "+251", country: "Ethiopia" },
  { code: "+20", country: "Egypt" },
  { code: "+212", country: "Morocco" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
]

interface CountryCodeSelectorProps {
  onSelect: (code: string) => void
  defaultCode?: string
}

export function CountryCodeSelector({ onSelect, defaultCode = "+234" }: CountryCodeSelectorProps) {
  const [selectedCode, setSelectedCode] = useState(defaultCode)

  const handleSelect = (value: string) => {
    setSelectedCode(value)
    onSelect(value)
  }

  return (
    <Select value={selectedCode} onValueChange={handleSelect}>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Code" />
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.code} {country.country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
