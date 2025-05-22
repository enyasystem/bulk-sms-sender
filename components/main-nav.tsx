"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare, BarChart3, Clock } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Send SMS",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/history",
      label: "History",
      icon: <Clock className="h-4 w-4 mr-2" />,
      active: pathname === "/history",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      active: pathname === "/dashboard",
    },
  ]

  return (
    <nav className="flex items-center space-x-2">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button variant={route.active ? "default" : "ghost"} size="sm" className="h-9">
            {route.icon}
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
