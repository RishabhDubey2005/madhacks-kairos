"use client"

import * as React from "react"
import { CalendarDays, ChevronRight, Home, Menu, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const assignments = [
  { id: 1, title: "Research Paper", dueDate: "2024-03-15", course: "History 101" },
  { id: 2, title: "Math Problem Set", dueDate: "2024-03-16", course: "Math 202" },
  { id: 3, title: "Lab Report", dueDate: "2024-03-17", course: "Chemistry 301" },
  { id: 4, title: "Group Project", dueDate: "2024-03-18", course: "Business 401" },
]

const navigationItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Assignments", icon: ChevronRight, href: "/assignments" },
  { title: "Calendar", icon: CalendarDays, href: "/calendar" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

export function Dashboard() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <section>
        <h3 className="mb-4 text-lg font-semibold">Upcoming Assignments</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex aspect-square flex-col items-center justify-center space-y-4">
              <ChevronRight className="h-12 w-12" />
              <h3 className="text-lg font-medium">Assignment</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex aspect-square flex-col items-center justify-center space-y-4">
              <CalendarDays className="h-12 w-12" />
              <h3 className="text-lg font-medium">Calendar</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex aspect-square flex-col items-center justify-center space-y-4">
              <Settings className="h-12 w-12" />
              <h3 className="text-lg font-medium">Settings</h3>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}