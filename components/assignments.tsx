'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';

interface Assignment {
  context_type: string;
  context_name: string;
  assignment: {
    id: string | number;
    name: string;
    description: string;
    due_at: string;
    points_possible: number;
    html_url: string;
  };
}

export default function AssignmentList() {
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const stripHtmlTags = (html: string) => {
    if (typeof window === 'undefined') {
      // Server-side: Use regex to remove HTML tags
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    } else {
      // Client-side: Use DOMParser
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
  };

  function handleAddToCalendar(assignment: Assignment): void {
    // Calendar integration logic would go here
    console.log('Adding to calendar:', assignment.assignment.name);
  }

  // Sample data from the backend
  const assignments: Assignment[] = [
    {
      "context_type": "Course",
      "context_name": "MATH341: Linear Algebra (002) FA24",
      "assignment": {
        "id": 2439778,
        "name": "HW10",
        "description": "",
        "due_at": "2024-11-12T05:59:59Z",
        "points_possible": 10.0,
        "html_url": "https://canvas.wisc.edu/courses/424197/assignments/2439778"
      }
    },
    {
      "context_type": "Course",
      "context_name": "GENETICS133: Genetics in the News (001) FA24",
      "assignment": {
        "id": 2482676,
        "name": "M7 l Sex Verification Testing in Athletes",
        "description": "Complete the quiz after reviewing materials...",
        "due_at": "2024-11-14T17:00:00Z",
        "points_possible": 5.0,
        "html_url": "https://canvas.wisc.edu/courses/415889/assignments/2482676"
      }
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Assignments</h1>
        <span className="text-sm text-muted-foreground">
          {assignments.length} assignments due
        </span>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <Card key={assignment.assignment.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-2">{assignment.assignment.name}</CardTitle>
              <p className="text-sm text-muted-foreground font-medium">
                {assignment.context_name}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                {assignment.assignment.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {stripHtmlTags(assignment.assignment.description)}
                  </p>
                )}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Due: {formatDueDate(assignment.assignment.due_at)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Points: {assignment.assignment.points_possible}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToCalendar(assignment)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(assignment.assignment.html_url, '_blank')}
                  >
                    View Assignment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}