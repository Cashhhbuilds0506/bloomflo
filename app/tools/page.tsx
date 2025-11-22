"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, CalendarCheck, Wind } from "lucide-react"
import { AnimatedLotusLogo } from "@/components/animated-lotus-logo"

export default function ToolsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <AnimatedLotusLogo size="lg" className="mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-foreground">Tools</h1>
        <p className="text-muted-foreground">ADHD-friendly tools to help you focus, plan, and unwind.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <Timer className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Focus Timer</CardTitle>
            <CardDescription>Pomodoro-style sessions with breaks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/focus-timer">
              <Button className="w-full">Open Focus Timer</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CalendarCheck className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Habit Tracker</CardTitle>
            <CardDescription>Build routines and track streaks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/habits">
              <Button className="w-full">Open Habit Tracker</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <Wind className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Mindfulness</CardTitle>
            <CardDescription>Guided breathing and grounding.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mindfulness">
              <Button className="w-full">Open Mindfulness</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
