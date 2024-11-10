'use client'

import React, { useState } from 'react'
import { addDays, format, startOfWeek, isSameDay, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const WeekViewCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 })

  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrentWeek, i))
  const hours = [...Array(24)].map((_, i) => i)

  const navigateDay = (direction: "next" | "prev") => {
    setCurrentDate(prevDate => addDays(prevDate, direction === 'next' ? 1 : -1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="w-full h-full flex flex-col bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateDay('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateDay('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <div className="flex-grow overflow-auto">
        <div className="sticky top-0 z-10 bg-background">
          <div className="flex border-b">
            <div className="w-16 flex-shrink-0"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="flex-1 text-center py-2">
                <div className="font-semibold">{format(day, 'EEE')}</div>
                <div 
                  className={`inline-flex items-center justify-center w-8 h-8 text-sm rounded-full
                    ${isToday(day) ? 'bg-red-500 text-white' : 
                      isSameDay(day, currentDate) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="w-16 flex-shrink-0">
            {hours.map((hour) => (
              <div key={hour} className="h-12 border-b text-xs text-right pr-2 pt-1">
                {format(new Date().setHours(hour), 'ha')}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className={`border-l ${isSameDay(day, currentDate) ? 'bg-muted/50' : ''}`}>
                {hours.map((hour) => (
                  <div key={hour} className="h-12 border-b"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekViewCalendar